import { css } from 'lit'

export const tokens = css`
  :host {
    /* Colors */
    --cs-sync-primary: #047d95;
    --cs-sync-primary-hover: #036b82;
    --cs-sync-primary-active: #025a6d;
    
    --cs-sync-background: #ffffff;
    --cs-sync-background-secondary: #f6f6f6;
    --cs-sync-background-tertiary: #ededed;
    
    --cs-sync-border: #d5d5d5;
    --cs-sync-border-focus: #047d95;
    
    --cs-sync-text-primary: #1d1d1f;
    --cs-sync-text-secondary: #6e6e73;
    --cs-sync-text-tertiary: #86868b;
    
    --cs-sync-error: #dd3939;
    --cs-sync-warning: #ff9900;
    --cs-sync-success: #1d8102;
    --cs-sync-info: #0972d3;
    
    /* Spacing */
    --cs-sync-space-xs: 0.25rem;
    --cs-sync-space-sm: 0.5rem;
    --cs-sync-space-md: 1rem;
    --cs-sync-space-lg: 1.5rem;
    --cs-sync-space-xl: 2rem;
    
    /* Typography */
    --cs-sync-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    --cs-sync-font-size-xs: 0.75rem;
    --cs-sync-font-size-sm: 0.875rem;
    --cs-sync-font-size-md: 1rem;
    --cs-sync-font-size-lg: 1.125rem;
    --cs-sync-font-size-xl: 1.5rem;
    --cs-sync-font-size-xxl: 2rem;
    
    --cs-sync-font-weight-normal: 400;
    --cs-sync-font-weight-medium: 500;
    --cs-sync-font-weight-semibold: 600;
    --cs-sync-font-weight-bold: 700;
    
    --cs-sync-line-height-sm: 1.25;
    --cs-sync-line-height-md: 1.5;
    --cs-sync-line-height-lg: 1.75;
    
    /* Border Radius */
    --cs-sync-radius-sm: 0.25rem;
    --cs-sync-radius-md: 0.375rem;
    --cs-sync-radius-lg: 0.5rem;
    
    /* Shadows */
    --cs-sync-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
    --cs-sync-shadow-md: 0 2px 4px rgba(0, 0, 0, 0.06);
    --cs-sync-shadow-lg: 0 4px 8px rgba(0, 0, 0, 0.08);
    
    /* Transitions */
    --cs-sync-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --cs-sync-transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`
