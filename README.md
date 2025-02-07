# companion-module-generic-speedtest

See [HELP.md](/companion/HELP.md) and [LICENSE](./LICENSE)

## Changelog

### v2.0.0

- Upgrade backend universal-speedtest library to a modern version.

  **Note: as of this version, Cloudflare has been removed in the speedtest library, and it now unavailable as a test service. For now, Ookla's speedtest.net is the only available service.**

### v1.0.4

- Fix
  - Speedtest.net test not working when bundled with Companion

### v1.0.3

- Fix
  - Update code dependency

### v1.0.2

**Note: as of this version, you must now run the test using the "Run Test" action. It will not run automatically on module start to allow you specify a service before running, and prevent any crashes if a test fails**

- Fix
  - Cloudflare upload result not showing properly

### v1.0.1

- New
  - Additional presets added
- Fix
  - Show default variable values while speed test is running

### v1.0.0

- Initial release
