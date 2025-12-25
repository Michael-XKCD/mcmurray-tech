// Professional Experience Multi-Filter System
document.addEventListener('DOMContentLoaded', function() {
  const highlights = document.querySelectorAll('.experience-highlight');
  const entries = document.querySelectorAll('.experience-entry, .education-entry');
  
  // Track active highlights for each category - now arrays for multiple selections
  const activeFilters = {
    focus: [],
    tech: [],
    industry: []
  };
  
  // Helper function to determine filter category
  function getFilterCategory(filterValue) {
    if (filterValue.startsWith('focus-')) {
      return 'focus';
    } else if (filterValue.startsWith('tech-')) {
      return 'tech';
    } else if (filterValue.startsWith('industry-')) {
      return 'industry';
    }
    return null;
  }
  
  // Check if filter is an "All" filter
  function isAllFilter(filterValue) {
    return filterValue === 'focus-all' || filterValue === 'tech-all' || filterValue === 'industry-all';
  }
  
  // Apply highlighting to all entries (no filtering/hiding)
  function applyFilters() {
    // If all filters are empty (all "All" selected), remove all highlights
    const hasActiveFilters = activeFilters.focus.length > 0 || activeFilters.tech.length > 0 || activeFilters.industry.length > 0;
    
    if (!hasActiveFilters) {
      entries.forEach(entry => {
        // Remove all tag highlights
        const tags = entry.querySelectorAll('.exp-tag');
        tags.forEach(tag => tag.classList.remove('exp-tag-highlighted'));
      });
      return;
    }
    
    // Highlight matching tags in all entries (without hiding any)
    entries.forEach(entry => {
      highlightTags(entry);
    });
  }
  
  // Highlight tags that match active filters
  function highlightTags(entry) {
    const tags = entry.querySelectorAll('.exp-tag');
    
    tags.forEach(tag => {
      // Remove existing highlight
      tag.classList.remove('exp-tag-highlighted');
      
      // Get the tech, focus, and industry categories from data attributes
      const techCategory = tag.getAttribute('data-tech');
      const focusCategory = tag.getAttribute('data-focus');
      const industryCategory = tag.getAttribute('data-industry');
      
      // Highlight if any tech filter matches
      if (activeFilters.tech.length > 0 && techCategory) {
        // Split space-separated tech categories
        const techCategories = techCategory.split(' ').map(t => t.trim());
        const hasMatchingTech = activeFilters.tech.some(techFilter => {
          const activeTech = techFilter.replace('tech-', '');
          return techCategories.includes(activeTech);
        });
        if (hasMatchingTech) {
          tag.classList.add('exp-tag-highlighted');
        }
      }
      
      // Highlight if any focus filter matches
      if (activeFilters.focus.length > 0 && focusCategory) {
        const hasMatchingFocus = activeFilters.focus.some(focusFilter => {
          const activeFocus = focusFilter.replace('focus-', '');
          return focusCategory === activeFocus;
        });
        if (hasMatchingFocus) {
          tag.classList.add('exp-tag-highlighted');
        }
      }
      
      // Highlight if any industry filter matches
      if (activeFilters.industry.length > 0 && industryCategory) {
        const hasMatchingIndustry = activeFilters.industry.some(industryFilter => {
          const activeIndustry = industryFilter.replace('industry-', '');
          return industryCategory === activeIndustry;
        });
        if (hasMatchingIndustry) {
          tag.classList.add('exp-tag-highlighted');
        }
      }
    });
  }
  
  // Set up filter click handlers
  highlights.forEach(filter => {
    filter.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');
      const category = getFilterCategory(filterValue);
      
      if (!category) return;
      
      // Handle "All" filter - clear all highlights in this category
      if (isAllFilter(filterValue)) {
        activeFilters[category] = [];
        
        // Remove active class from all highlights in this category
        highlights.forEach(f => {
          const fValue = f.getAttribute('data-filter');
          const fCategory = getFilterCategory(fValue);
          if (fCategory === category) {
            f.classList.remove('active');
          }
        });
        
        // Add active class to "All" filter
        this.classList.add('active');
      } else {
        // Remove active class from "All" filter in this category
        highlights.forEach(f => {
          const fValue = f.getAttribute('data-filter');
          const fCategory = getFilterCategory(fValue);
          if (fCategory === category && isAllFilter(fValue)) {
            f.classList.remove('active');
          }
        });
        
        // Toggle this filter
        const filterIndex = activeFilters[category].indexOf(filterValue);
        if (filterIndex > -1) {
          // Filter is active, remove it
          activeFilters[category].splice(filterIndex, 1);
          this.classList.remove('active');
          
          // If no highlights active, activate "All"
          if (activeFilters[category].length === 0) {
            highlights.forEach(f => {
              const fValue = f.getAttribute('data-filter');
              const fCategory = getFilterCategory(fValue);
              if (fCategory === category && isAllFilter(fValue)) {
                f.classList.add('active');
              }
            });
          }
        } else {
          // Filter is not active, add it
          activeFilters[category].push(filterValue);
          this.classList.add('active');
        }
      }
      
      // Apply all filters
      applyFilters();
    });
  });
});
