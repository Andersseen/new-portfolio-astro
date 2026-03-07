import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-footer",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer
      class="mt-auto py-8 text-center text-foreground-secondary text-sm border-t border-border/30"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p>&copy; {{ currentYear }} Andersseen Dev. All rights reserved.</p>
          <p class="text-foreground-tertiary text-xs">
            Built with
            <span class="inline-flex items-center gap-1">
              <span class="text-primary font-medium">Astro</span> +
              <span class="text-primary font-medium">Preact</span> +
              <span class="text-primary font-medium">Angular</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  `,
})
export default class Footer {
  readonly currentYear = new Date().getFullYear();
}
