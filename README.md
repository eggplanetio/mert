
<p align="center"><img
src="https://cloud.githubusercontent.com/assets/659829/15808225/1a837da0-2b27-11e6-94fc-7809d432cd4a.jpg" width="150px"></p>

# mert

An iTerm 3-compatible tab & pane manager.

## Installation

```
npm install -g mert
```

## Usage

```bash
init <global | local>                         # Create new .mertrc file locally or in home dir
                                              # (defaults to local)

start <projectname | path to .mertrc file>    # Start a mertrc project (defaults to .mertc in current
                                              # directory)
```

## Overview

_mert_ is a simple command line tool for managing your tab & pane configurations for iTerm 3
and iTerm 2. A little yaml config (called the `.mertrc` file) along with some JXA (Javascript +
Applescript), you can have your iTerm environment up and running in no time.

_mert_ uses a combination of a "global" file at `~/.mertrc` and/or one in your current directory to
spin up your iTerm environment.

## Examples

Take the following two `.mertrc` files:

#### Global Config
```yaml
# ~/.mertrc
foo:
  root: ~/code/foo
  layout:
    -
      - echo "Row 1, Pane 1"
      - echo "Row 1, Pane 2"
    -
      - echo "Row 2, Pane 1"
  ```

#### Local Config
```yaml
# /Users/brian/code/bar/.mertrc
layout:
  -
    - echo "Row 1, Pane 1 in bar"
    - echo "Row 1, Pane 2 in bar"
  -
    - echo "Row 2, Pane 1 in bar"
```

Running the following:

```bash
mert start foo
```

would result in the following iTerm window, each command running in `~/code/foo`:

```
+-------------------------------------------+
| "Row 1, Pane 1"     | "Row 1, Pane 2      |
|                     |                     |
|---------------------|---------------------|
| "Row 2, Pane 2"     | "Row 2, Pane 2      |
|                     |                     |
+---------------------|---------------------+
```

Checkout the demo below:

![mert demo](https://cloud.githubusercontent.com/assets/659829/15803031/c0e7a9e0-2a7e-11e6-89f9-38704b28ecba.gif)

License
--------
Released under the MIT License.

Questions?
----------
| ![twitter/brianmgonzalez](http://gravatar.com/avatar/f6363fe1d9aadb1c3f07ba7867f0e854?s=70](http://twitter.com/brianmgonzalez "Follow @brianmgonzalez on Twitter") |
|---|
| [Brian Gonzalez](http://briangonzalez.org) |
