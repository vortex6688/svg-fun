# Errata

This file is a collection of use tidbits of information and notes. 

### master-editorial.typenetwork.com Deployment

Automatic deployment of the master branch to master-editorial.typenetwork.com is controlled by circle ci and a small cron script on the server.

1. Circle CI builds tn-admin-editorial using `circle.yml`. There is a manual environment variable in Circle CI's configuration to set `TN_API_URL` to point at our dev django server.
2. If the tests pass, Circle CI then creates a `.tgz` file with the build results and stores it as an artifact
3. On our dev server `master.typenetwork.com`, there is a script located in `/etc/cron.daily/update-tn-admin-editorial` that fetches the latest build artifact from Circle CI and extracts it to `/opt/tn-admin-editorial`. This script is automatically run daily.