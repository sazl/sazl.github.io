---
title: "Appveyor Cygwin Build Tips"
date: 2018-10-20T07:41:22-04:00
tags: [CS, appveyor, cygwin, ci]
---

Some tips for working with Appveyor and Cygwin:

## Git Client

```yaml
init:
    - git config --global core.symlinks true
    - git config --global core.autocrlf input
```

More Info: [https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_code_core_autocrlf_code](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_code_core_autocrlf_code)

## Environment Variables

Set Windows environment variables so that they're accessible from within Cygwin.

```yaml
init:
    - 'FOR /F "tokens=* USEBACKQ" %%F IN (`%CYG_PATH% %APPVEYOR_BUILD_FOLDER%`) DO SET BUILD_FOLDER=%%F'
```

This is equivalent to:

```bash
export BUILD_FOLDER=$APPVEYOR_BUILD_FOLDER
```

## Building on Cygwin x86 and x86_64

```yaml
environment:
    matrix:
        - CYG_ARCH: x86
          CYG_ROOT: C:/cygwin
          CYG_CACHE: C:/cygwin/var/cache/setup
          CYG_SH: C:/cygwin/bin/bash -lc
          CYG_INSTALL: C:/cygwin/setup-x86.exe -q -P
          CYG_PATH: C:/cygwin/bin/cygpath -u
        - CYG_ARCH: x86_64
          CYG_ROOT: C:/cygwin64
          CYG_CACHE: C:/cygwin64/var/cache/setup
          CYG_SH: C:/cygwin64/bin/bash -lc
          CYG_INSTALL: C:/cygwin64/setup-x86_64.exe -q -P
          CYG_PATH: C:/cygwin64/bin/cygpath -u
```

## Cache

Cache Cygwin installs between build runs:

```yaml
cache:
    - '%CYG_CACHE%'
```

## Installing Cygwin Packages

Use apt-cyg to install Cygwin packages.

```yaml
init:
    - '%CYG_SH% "cygcheck -dc cygwin"'
    - '%CYG_INSTALL% "wget"'
    - '%CYG_SH% "wget rawgit.com/transcode-open/apt-cyg/master/apt-cyg"'
    - '%CYG_SH% "install apt-cyg /bin"'
    - '%CYG_SH% "apt-cyg install make autoconf automake gcc-core"'
```