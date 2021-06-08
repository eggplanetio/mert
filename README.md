
<p align="center"><img
src="https://cloud.githubusercontent.com/assets/659829/16184456/587485f0-3671-11e6-921a-3d9214fd0678.png"></p>

> An iTerm 3-compatible window, tab, and pane manager.

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

_mert_ is a simple command line tool for managing your windows, tabs, and pane configurations for iTerm 3
and iTerm 2. A little yaml config file (called the `.mertrc` file) along with some JXA (Javascript +
Applescript), you can have your iTerm environment up and running in no time.

_mert_ uses a combination of a "global" file at `~/.mertrc` and/or one in your current directory to
spin up your iTerm environment.

## Examples

_mert_ supports window, tab, and pane management. Examples live inside of
`./tests/examples`, so that's a great place to start.

- [Panes](https://github.com/eggplanetio/mert/blob/master/tests/examples/.mertrc-base)
- [Tabs & Panes](https://github.com/eggplanetio/mert/blob/master/tests/examples/.mertrc-tabs)
- [Windows, Tabs, & Panes](https://github.com/eggplanetio/mert/blob/master/tests/examples/.mertrc-windows-and-tabs)

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
By default *mert* adopts a vertical-first split strategy. This behavior can be changed by explicitly setting the `split_strategy` option to 'horizontal' in the `.mertrc` file.

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

Whereas a `.mertrc` with the `split_strategy` configuration set, as shown here:

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

### Launch Strategy
By default *mert* will start a new iTerm window and launch your layout into it. You can choose to launch your layout
into a new tab, or into the current pane, instead by using the root-level `launch_strategy` option.

See [Tab Launch Strategy](https://github.com/eggplanetio/mert/blob/master/tests/examples/.mertrc-launch-strategy-tab)
and [In-Place Launch Strategy](https://github.com/eggplanetio/mert/blob/master/tests/examples/.mertrc-launch-strategy-in_place)
for an example.

### Profiles
By default *mert* will use the `Default` iTerm profile. You can use a different profile for your layout
by adding the root-level `profile` option.

To use a different profile, set the `profile` configuration on the `.mertrc` file:

```yaml
profile: "MyProfile"
layout:
  -
    - echo "Col 1, Pane 1"
  -
    - echo "Col 2, Pane 1"
    - echo "Col 2, Pane 2"
```

## Testing

```
npm run test
```

## License

Released under the MIT License.

## Questions?

Brought to you by [eggplanet](http://www.eggplanet.io/).

## Contributors

- [@brianmgonzalez](https://twitter.com/brianmgonzalez)
- [@michaelmoussa](https://twitter.com/michaelmoussa)
- [@ghosh](https://twitter.com/_ighosh)
- [@juancaldera](#)
