---
title: "CNAME Flattening: When Your Root Domain Needs a CNAME"
date: 2024-05-12T09:00:00-07:00
draft: false
tags: ["dns", "networking", "cloudflare"]
categories: ["blog-posts", "dns"]
description: "Understanding CNAME flattening, why root domains can't be CNAMEs, and when this DNS trick becomes essential for modern web infrastructure."
---

Root domains (apex domains) can't technically be a CNAME record according to DNS specifications, but many modern DNS providers offer **CNAME flattening** to work around this limitation. This technique resolves the target of what would be a CNAME and returns the actual A/AAAA records on your behalf.

## The Problem: DNS Specifications vs. Modern Needs

The DNS RFC specifications state that a CNAME record cannot coexist with other record types at the same label. Since root domains typically need other essential records (like MX for email, NS for nameservers), traditional CNAME records are prohibited at the apex.

This creates problems in modern infrastructure where you might want to:
- Point your root domain to a CDN endpoint
- Use load balancers with dynamic IPs
- Leverage cloud services that provide hostnames instead of static IPs

## How CNAME Flattening Works

**CNAME flattening** is a DNS provider feature that:

1. **Accepts CNAME-like configuration** for your root domain
2. **Resolves the target** behind the scenes at query time
3. **Returns A/AAAA records** to the client, maintaining DNS compliance
4. **Updates automatically** when the target's IP addresses change

### Example Scenario

Instead of this (which violates DNS specs):
```
example.com.    IN  CNAME   myapp.herokuapp.com.
example.com.    IN  MX  10  mail.example.com.
```

Your DNS provider handles it like this internally:
```
; Provider resolves myapp.herokuapp.com → 1.2.3.4
example.com.    IN  A       1.2.3.4
example.com.    IN  MX  10  mail.example.com.
```

## Key Implementation Considerations

### Provider Caching and TTL Behavior
- **Resolution frequency**: How often does your provider re-resolve the target?
- **TTL handling**: What TTL does the provider use for the flattened records?
- **Propagation delays**: Changes to the target may not be immediate

### Multi-CDN and Health Check Scenarios
When using multiple CDNs or complex routing:
- **Health check integration**: Some providers can avoid returning IPs for unhealthy endpoints
- **Geographic routing**: CNAME flattening may interfere with location-based DNS responses
- **Failover complexity**: Traditional CNAME chains handle failover differently than flattened records

### Performance Implications
- **Additional DNS lookups**: Your provider must resolve the target for each query or cache appropriately
- **Latency considerations**: Extra resolution steps can add milliseconds to DNS response times
- **Cache invalidation**: When target IPs change, cached flattened records need updating

## When to Use CNAME Flattening

**Ideal scenarios:**
- Pointing root domain to CDNs (Cloudflare, AWS CloudFront, etc.)
- Using cloud load balancers with dynamic endpoints
- Leveraging Platform-as-a-Service providers (Heroku, Vercel, etc.)
- Maintaining flexibility while meeting DNS compliance

**Consider alternatives when:**
- You control the target IPs and they rarely change
- Maximum DNS performance is critical
- You need predictable TTL behavior
- Complex routing logic is required

## Popular Providers Supporting CNAME Flattening

- **Cloudflare**: Automatic CNAME flattening for all plans
- **AWS Route 53**: Alias records provide similar functionality
- **Cloudns**: ALIAS records with CNAME flattening
- **DNSimple**: ALIAS record support
- **Many others**: Check your provider's documentation for "ALIAS," "ANAME," or "CNAME flattening"

## Best Practices

1. **Test thoroughly**: Verify behavior across different DNS resolvers and geographic locations
2. **Monitor resolution times**: Ensure CNAME flattening doesn't introduce unacceptable latency
3. **Document dependencies**: Note which services rely on the flattening behavior
4. **Have fallback plans**: Keep static A records as backup when possible
5. **Review provider SLAs**: Understand uptime guarantees for the flattening service

## Conclusion

CNAME flattening elegantly solves the root domain CNAME limitation, enabling modern infrastructure patterns while maintaining DNS compliance. However, it introduces dependencies on your DNS provider's resolution behavior and caching strategy.

For most use cases involving CDNs, cloud services, and dynamic infrastructure, CNAME flattening is the right choice. Just ensure you understand your provider's implementation and have appropriate monitoring in place.

**When in doubt**: Prefer explicit A/AAAA records when you control the targets and they don't change often. Use CNAME flattening when you need the flexibility and your DNS provider offers reliable implementation.
