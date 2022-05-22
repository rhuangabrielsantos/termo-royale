import { logEvent } from 'firebase/analytics';

import { analytics } from '../service/FirebaseService';

export function registerEvent(event: string) {
  if (typeof analytics !== 'undefined') {
    logEvent(analytics, event);
  }
}

export function registesPageView(page: string) {
  if (typeof analytics !== 'undefined') {
    logEvent(analytics, 'page_view', { page_path: page });
  }
}
