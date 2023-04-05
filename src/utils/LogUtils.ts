import { logEvent } from "firebase/analytics";

import { analytics } from "../service/FirebaseService";

interface EventDimensions {
  number_of_players?: string;
  letter?: string;
}

export function registerEvent(
  event: string,
  eventDimensions?: EventDimensions
) {
  if (typeof analytics !== "undefined") {
    logEvent(analytics, event, eventDimensions);
  }
}

export function registerPageView(page: string) {
  if (typeof analytics !== "undefined") {
    logEvent(analytics, "page_view", { page_path: page });
  }
}
