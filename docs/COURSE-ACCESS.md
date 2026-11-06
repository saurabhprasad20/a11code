# Temporary course pause

`config/course-access.json` controls course availability. While `coursesPaused`
is `true`, the catalog and every existing course URL show only “In progress”
and “Please check back later.” This applies to signed-in visitors too. Course
metadata is generic, the navigation dropdown is replaced with a Courses link,
and the build excludes course data from browser JavaScript.

To restore the catalog, navigation dropdown, and lessons, set `coursesPaused`
to `false`, run `npm run build`, and deploy the new build. Course source files
remain intact. Restart the development server after changing this setting.

The pause takes effect when the new deployment is live. Previously downloaded
or cached copies of course material cannot be withdrawn from visitors' devices.
