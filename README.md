# bash-wrapper-node
Module for executing bash commands from within Node.

For Linux/Mac there are no special requirements.

For Windows, this depends on the Linux Subsystem for Windows, and Windows 10 Creators Update. Previous versions of Windows 10 will not work.

## Install
npm install bash-wrapper-node

## API

### string Bash.cwd()
Returns the current working directory.

### string Bash.cwd(string)
Sets the current working directory to string.

### void exec(commandString, callback)
Asynchronously executes the commandString. The callback parameters are: (error, stdout, stderr)

Note: Never pass unsanitised user input to this function. Any input containing shell metacharacters may be used to trigger arbitrary command execution.

### Buffer execSync(commandString)
Synchronously executes the commandString and returns a buffer containing the stdout.

Note: Never pass unsanitised user input to this function. Any input containing shell metacharacters may be used to trigger arbitrary command execution.

### void isSupported(callback)
Checks for bash support on the running platform. For Mac/Linux, it is assumed to be true. For windows, support will be true if bash.exe from WSL is findable.

Callback contains 1 parameter: (boolean supported)

