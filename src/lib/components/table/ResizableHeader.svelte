<script lang="ts">
  import type { TableColumn } from '$lib/types/table';
  import { browser } from '$app/environment';
  
  interface Props {
    column: TableColumn;
    onResize: (width: number) => void;
  }

  let { column, onResize }: Props = $props();
  
  let isResizing = $state(false);
  let startX = $state(0);
  let startWidth = $state(0);
  let currentWidth = $state(0);

  function handleMouseDown(e: MouseEvent) {
    if (!browser) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    isResizing = true;
    startX = e.pageX;
    
    const th = (e.target as HTMLElement).closest('th');
    startWidth = th?.offsetWidth || 0;
    currentWidth = startWidth;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.body.classList.add('table-resizing');
  }

  function handleMouseMove(e: MouseEvent) {
    if (!isResizing || !browser) return;
    
    const diff = e.pageX - startX;
    const newWidth = Math.max(50, startWidth + diff);
    
    currentWidth = newWidth;
    onResize(newWidth);
  }

  function handleMouseUp() {
    if (!browser) return;
    
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('keydown', handleKeyDown);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.body.classList.remove('table-resizing');
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!isResizing) return;
    
    let adjustment = 0;
    
    switch (e.key) {
      case 'ArrowLeft':
        adjustment = e.shiftKey ? -10 : -1;
        break;
      case 'ArrowRight':
        adjustment = e.shiftKey ? 10 : 1;
        break;
      case 'Escape':
        // Reset to original width
        onResize(startWidth);
        handleMouseUp();
        return;
      case 'Enter':
        // Finalize resize
        handleMouseUp();
        return;
      default:
        return;
    }
    
    if (adjustment !== 0) {
      e.preventDefault();
      const newWidth = Math.max(50, currentWidth + adjustment);
      currentWidth = newWidth;
      onResize(newWidth);
    }
  }

  // Double-click to auto-fit
  function handleDoubleClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    
    const th = (e.target as HTMLElement).closest('th');
    if (!th) return;
    
    // Get the content width
    const content = th.querySelector('div');
    if (content) {
      const contentWidth = content.scrollWidth + 32; // Add padding
      onResize(Math.max(80, contentWidth));
    }
  }
</script>

<div
  class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors z-10
    {isResizing ? 'bg-blue-500 dark:bg-blue-400 w-0.5' : 'bg-transparent'}"
  onmousedown={handleMouseDown}
  ondblclick={handleDoubleClick}
  role="separator"
  aria-orientation="vertical"
  aria-label="Resize column {column.title}"
  tabindex="0"
  title="Drag to resize • Double-click to auto-fit • Arrow keys to adjust"
>
  <!-- Wider hit area -->
  <div class="absolute inset-y-0 -left-2 -right-2"></div>
  
  <!-- Visual indicator -->
  {#if isResizing}
    <div class="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500 dark:bg-blue-400 shadow-lg -translate-x-1/2"></div>
  {/if}
</div>

<style>
  div[role="separator"] {
    touch-action: none;
  }
  
  div[role="separator"]:focus {
    outline: 2px solid rgb(59 130 246);
    outline-offset: -1px;
  }
  
  /* Hover effect */
  div[role="separator"]::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 20px;
    background: currentColor;
    border-radius: 2px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  
  div[role="separator"]:hover::before {
    opacity: 0.5;
  }
</style>