# Repository Guidelines

This repository stores a collection of static web sites for different
AI-related domains. Follow these rules when contributing:

- **Separate folders**: each domain should live in its own top level folder.
- **Static only**: pages use plain HTML, CSS and JavaScript. Keep frameworks and
  build systems to a minimum unless absolutely necessary.
- **Images**: store images within an `images/` subfolder of the domain directory.
- **Readmes**: update the root `README.md` when adding new domains. Individual
  folders may include a README explaining specifics of that site.
- **Testing**: there are no automated tests. Verify pages load correctly in a
  browser before committing.

Pull requests should include a short summary of the changes and any manual
steps taken to verify the pages render as expected.
