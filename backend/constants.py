# This file stores all constants used on the server-side of the Desert-Fireball-Maintainence-GUI.
# The major constants here are different bash commands, executed server-side.
getExitStatus = "echo $?"
getHostname = "hostname"

gpsCheck = "python /opt/dfn-software/leostick_get_status.py -g;"
setTimezone = "sudo ln -fs /usr/share/zoneinfo/{0} /etc/localtime"
outputTime = "date"

cameraOn = "python /opt/dfn-software/enable_camera.py;"
cameraOff = "python /opt/dfn-software/disable_camera.py;"
videoCameraOn = "python /opt/dfn-software/enable_video.py"
videoCameraOff = "python /opt/dfn-software/disable_video.py"
cameraCheck = "lsusb"
cameraActuation = "ls /data0/latest/*.NEF | xargs exiv2 | grep 'Shutter Speed'"
getDirectorySize = "du -sh {0} | egrep -o '[0-9]+[A-Z]+'"
getNumFilesInDirectory = 'find {0} -type f | wc -l'
findPictures = "find /data[0-3] -type d -name '*{0}-{1}-{2}*' | grep -v 'test\|video'"
copyFileToStatic = "mkdir /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads; cp {0} /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads/ && echo SUCCESS"
extractThumbnail = "mkdir /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads; exiv2 -ep3 -l /opt/dfn-software/Desert-Fireball-Maintainence-GUI/static/downloads/ {0} && SUCCESS"
shutterCount = "exiv2 -pa {0} | grep Nikon3\.ShutterCount | grep -oP '[0-9]{5}'"

enableHardDrive = "python /opt/dfn-software/enable_ext-hd.py;"
scanSATA = "for i in $(find /sys/class/scsi_host/ -name host* ); do echo '- - -' > $i/scan; done"
disableHardDrive = "python /opt/dfn-software/disable_ext-hd.py;"
extDeleteDriveDevicesCheck = "smartctl -i /dev/{0} | grep 'Rotation Rate:'"
extDeleteDriveDevice = "echo 1 > /sys/block/{0}/device/delete"
mountHardDrive = "mount {0} && echo SUCCESS"
unmountHardDrive = "umount {0} && echo SUCCESS"
probeHardDrives = "/root/bin/dfn_setup_data_hdds.sh -p"
formatHardDrive = "/root/bin/dfn_setup_data_hdds.sh {0};"
probeHardDrivesOLD = "/root/bin/dfn_setup_usb_hdds.sh -p"
formatHardDriveOLD = "/root/bin/dfn_setup_usb_hdds.sh {0};"
hddPoweredStatus = "lsusb"
hddPoweredStatusExt = "lsblk | grep 'sdb1\|sdc1\|sdd1'"
data0PoweredStatus = "df | grep /data0 && echo SUCCESS"
moveData0 = "/usr/local/bin/move_data_files.sh && echo SUCCESS"
moveData0Ext = "/usr/local/bin/move_data_files_gen3.sh && echo SUCCESS"
mountedStatus = "mount | grep {0} > /dev/null && echo 1"
hddSpace = "cat /tmp/dfn_disk_usage"
hddSpaceLive = "df -h | egrep 'Filesystem|data'"
runSmartTest = "smartctl -d {0} -t short /dev/sdb;"
checkSmartTest = "smartctl -d {0} -a /dev/sdb"

internetCheck = "ping -c 1 www.google.com"
getInternetIP = "ifconfig | grep eth1 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}' | cut -c6-"

vpnCheck = "ping -c 1 10.1.16.1"
getVpnIP = "ifconfig | grep tun0 -A 1 | grep -o '\(addr:\|inet \)[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}'| cut -c6-"

cfcheck = "python /opt/dfn-software/camera_image_count.py"
intervalTest = "/opt/dfn-software/interval_control_test.sh;"
checkIntervalResults = "ls -lR /data0/latest_prev/*.NEF | wc -l"
checkPrevIntervalStatus = "find /data0/latest -exec stat -c%y {} \; | sort -n -r | head -n 1"

getLogfileName = "ls /data0/{0} | grep .txt"

# Strings used as web console output
cameraSwitchedOn = "Camera on command executed. Check status for confirmation.\n"
cameraSwitchedOff = "Camera off command executed. Check status for confirmation.\n"
videoCameraSwitchedOn = "Video camera switched on. Check status for confirmation.\n"
videoCameraSwitchedOff = "Video camera switched off. Check status for confirmation.\n"
cameraCheckOn = "\nCAMERA STATUS:\nCamera online.\n"
cameraCheckOff = "\nCAMERA STATUS:\nCamera not found.\n"

gpsCheckFailed = "\nGPS STATUS:\nGPS offline.\n"
gpsOnline = "\nGPS STATUS:\nLock: {0}\nSatellites: {1}\nLatitude: {2}\nLongitude: {3}\nAltitude: {4}"
timezoneChanged = "\nTime zone changed to {0}.\n"

internetCheckPassed = "\nINTERNET STATUS:\nInternet access available at {0}.\n"
internetCheckFailed = "\nINTERNET STATUS:\nNo internet access.\n"

vpnCheckPassed = "\nVPN STATUS:\nVPN connection available at {0}.\n"
vpnCheckFailed = "\nVPN STATUS:\nNo VPN connection available.\n"

intervalTestPassed = "\nINTERVAL TEST RESULTS:\nInterval test passed.\n"
intervalTestFailed = "\nINTERVAL TEST RESULTS:\nInterval test failed.\n"
prevIntervalDidRun = "\nINTERVAL CONTROL RAN SUCCESSFULLY LAST NIGHT.\n"
prevIntervalNotRun = "\nINTERVAL CONTROL DID NOT RUN SUCCESSFULLY LAST NIGHT.\n"

hddStatusString = "\nHARD DRIVE STATUS:\nSystem Drive: {0}, {1} full.\nDrive #1: {2}, {3} full.\nDrive #2: {4}, {5} full.\nDrive #3: {6}, {7} full.\n"
hddStatusOff = "Not detected"
hddStatusPowered = "Powered"
hddStatusMounted = "Mounted"
hddFormatPassed = "\nHarddrives formatted successfully.\n"
hddFormatFailed = "Some drives still mounted, or didn't format properly. Please make sure drives are unmounted and safe to format."

hddCommandedOn = "Hard drive power on command executed.\n"
hddCommandedOff = "Hard drive power off successful.\n"
hddOffFailed = "Hard drive power off failed. Power off aborted.\n"
hddNotPoweredError = "Hard drives need to be powered."
hddAlreadyOn = "Hard drives already powered.\n"
hddNotOnPoweredState = "Hard drives already off, or mounted. Drives must be in a 'powered' state to turn off safely.\n"
hddAlreadyMountedError = "Hard drives may have already been mounted. See status for confirmation."
smartTestStartedSuccess = "\nSmart test for {0} successfully executed.\n"
smartTestStartedFailed = "\nSmart test {0} failed execution (try re-powering drives).\n"
smartTestResultsPassed = "Smart test for {0} passed.\n"
smartTestResultsFailed = "Smart test for {0} failed.\n"
smartTestNotPowereredError = "Smart test failed. Hard drives need to be powered."
smartTestCommandNotInstalled = "Smart test command not installed. Please contact 265815F@curtin.edu.au."

hddMountPassed = "{0} mounted successfully.\n"
hddMountFailed = "{0} mount error: {1}\n"
hddUnmountPassed = "{0} unmounted successfully.\n"
hddUnmountFailed = "{0} unmount error: {1}\n"
hddAlreadyUnmountedError = "May have already been unmounted."

scriptNotFound = "Script not found: {0}."
diskUsageNotFound = "Error reading disk usage log file. To see disk space, please power and mount external drives."
pictureNotFound = "Picture not found."

# File paths
diskUsagePath = "/tmp/dfn_disk_usage"
dfnconfigPath = "/opt/dfn-software/dfnstation.cfg"

# Script not found names
cameraOnScriptNotFound = scriptNotFound.format("enable_camera.py")
cameraOffScriptNotFound = scriptNotFound.format("disable_camera.py")
videoCameraOnScriptNotFound = scriptNotFound.format("enable_video.py")
videoCameraOffScriptNotFound = scriptNotFound.format("disable_video.py")
hddOnScriptNotFound = scriptNotFound.format("enable_ext-hd.py")
hddOffScriptNotFound = scriptNotFound.format("disable_ext-hd.py")
hddFormatScriptNotFound = scriptNotFound.format("dfn_setup_data_hdds.sh")
leostickStatusScriptNotFound = scriptNotFound.format("leostick_get_status.py")
intervalControlTestScriptNotFound = scriptNotFound.format("interval_control_test.sh")
cfCheckScriptNotFound = scriptNotFound.format("camera_image_count.py")

# Whitelist for which config variables the user can modify
configBoxWhitelist = {}
configBoxWhitelist["camera"] = {
    "camera_exposuretime",
    "camera_fstop",
    "still_lens",
    "vid_lens",
    "vid_ser_no",
    "vid_camera",
    "camera_ser_no",
    "vid_format",
    "still_camera",
    "camera_iso"
}

configBoxWhitelist["link"] = {
    "local_contact_email",
    "local_contact_name"
}

configBoxWhitelist["station"] = {
    "location",
    "lat",
    "altitude",
    "hostname",
    "lon"
}

configNotFound = "Config file not found."
configWriteFailed = "ERROR: Unable to write to config file (is internal drive mounted?)."
configWritePassed = "Overwritten {0} as {1}."

systemStatusHeader = "\n-----OVERALL SYSTEM STATUS-----\n"
