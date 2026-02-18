import { LitElement, html, css } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

interface CalendarEvent {
  id: string
  title: string
  module: string
  date: string
  type: 'course' | 'exam' | 'event'
}

@customElement('cs-calendar')
export class CsCalendar extends LitElement {
  @property({ type: Array }) events: CalendarEvent[] = []
  @state() private currentDate = new Date()
  @state() private view: 'month' | 'week' = 'month'

  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #e5e5e5;
    }

    .calendar-nav {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }

    .nav-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e5e5;
      border-radius: 0.5rem;
      background: white;
      cursor: pointer;
    }

    .nav-btn:hover {
      background: #f5f5f5;
    }

    .calendar-title {
      font-weight: 600;
      font-size: 1.25rem;
    }

    .view-toggle {
      display: flex;
      gap: 0.25rem;
    }

    .view-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #e5e5e5;
      background: white;
      cursor: pointer;
    }

    .view-btn:first-child {
      border-radius: 0.5rem 0 0 0.5rem;
    }

    .view-btn:last-child {
      border-radius: 0 0.5rem 0.5rem 0;
    }

    .view-btn.active {
      background: #1a1a1a;
      color: white;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: #e5e5e5;
      border: 1px solid #e5e5e5;
    }

    .calendar-day {
      background: white;
      min-height: 100px;
      padding: 0.5rem;
    }

    .day-number {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .event-item {
      font-size: 0.75rem;
      padding: 0.25rem;
      margin-bottom: 0.25rem;
      border-radius: 0.25rem;
      background: #f5f5f5;
      cursor: pointer;
    }

    .event-item.course {
      background: #dbeafe;
    }

    .event-item.exam {
      background: #fee2e2;
    }

    .event-item.event {
      background: #dcfce7;
    }
  `

  private getMonthName() {
    return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  private previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1
    )
  }

  private nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1
    )
  }

  render() {
    return html`
      <div class="calendar-header">
        <div class="calendar-nav">
          <button class="nav-btn" @click=${this.previousMonth}>←</button>
          <span class="calendar-title">${this.getMonthName()}</span>
          <button class="nav-btn" @click=${this.nextMonth}>→</button>
        </div>
        <div class="view-toggle">
          <button
            class="view-btn ${this.view === 'month' ? 'active' : ''}"
            @click=${() => (this.view = 'month')}
          >
            Month
          </button>
          <button
            class="view-btn ${this.view === 'week' ? 'active' : ''}"
            @click=${() => (this.view = 'week')}
          >
            Week
          </button>
        </div>
      </div>
      <div class="calendar-grid">
        ${Array.from({ length: 35 }, (_, i) => html`
          <div class="calendar-day">
            <div class="day-number">${i + 1}</div>
          </div>
        `)}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cs-calendar': CsCalendar
  }
}
