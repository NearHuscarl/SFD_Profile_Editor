import * as test from "./ducks/test.duck";
import * as editor from "./ducks/editor.duck";
import * as global from "./ducks/global.duck";
import * as profiles from "./ducks/profiles.duck";
import * as templates from "./ducks/templates.duck";
import * as settings from "./ducks/settings.duck";

export const testActions = test.actions;
export const editorActions = editor.actions;
export const globalActions = global.actions;
export const profileActions = profiles.actions;
export const templateActions = templates.actions;
export const settingsActions = settings.actions;

export const reducer = {
  test: test.reducer,
  editor: editor.reducer,
  global: global.reducer,
  profiles: profiles.reducer,
  templates: templates.reducer,
  settings: settings.reducer,
};
