
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
mert init [type]   # Create new .mertrc file. Options: global or local
mert start [name]  # Start project by name or by specifying file path (defaults to .mertrc in cwd)
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

Conversely, running:

```
cd /Users/brian/code/bar/.mertrc
mert start
```

Would spin up the `.mertrc` file within the parent directory.

Checkout the demo below:

![mert demo](https://cloud.githubusercontent.com/assets/659829/15803031/c0e7a9e0-2a7e-11e6-89f9-38704b28ecba.gif)

### Split Strategy
By default *mert* adopts a vertical-first split strategy. This behaviour can be changed by explicitly setting the `split_strategy` option to "horizontal" in the `.mertrc` file.

Take for example the following `.mertrc`:

```yaml
layout:
  -
    - echo "Row 1, Pane 1"
  -
    - echo "Row 2, Pane 1"
    - echo "Row 2, Pane 2"
```

This would result in the following iTerm window:
```
+-------------------------------------------+
| "Row 1, Pane 1"                           |
|                                           |
|---------------------|---------------------|
| "Row 2, Pane 2"     | "Row 2, Pane 2      |
|                     |                     |
+---------------------|---------------------+
```

Whereas a `.mertrc` with the `split_strategy` configuration set,

```yaml
split_strategy: "vertical"
layout:
  -
    - echo "Col 1, Pane 1"
  -
    - echo "Col 2, Pane 1"
    - echo "Col 2, Pane 2"
```

would produce an iTerm window like the one below:

```
+---------------------|---------------------+
| "Col 1, Pane 1"     | "Col 2, Pane 1      |
|                     |                     |
|                     |---------------------|
|                     | "Col 2, Pane 2      |
|                     |                     |
+---------------------|---------------------+
```


##License

Released under the MIT License.

##Questions?

Brought to you by [eggplanet](http://www.eggplanet.io/).

Reach out to [Brian Gonzalez](http://twitter.com/briangonzalez) for help.

## Contributors

- [@ghosh](https://twitter.com/_ighosh)
- [@brianmgonzalez](https://twitter.com/brianmgonzalez)
- [@juancaldera](#)
