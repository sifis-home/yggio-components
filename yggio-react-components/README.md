# yggio-react-components

### developing using storybook

To run, having updated the latest yggio dependencies with `yarn`, stand in this directory, i.e. `/shared-components/yggio-react-components` and run
```
$ yarn start
```
and then open a browser to `localhost:3001`

### developing using yggio compose

To develop and run using the yggio stack, first make sure you can develop using storybook. From this same directory run
```
$ yarn compile
```
or alternatively, with timestamps
```
$ yarn compilet
```
This will make the latest storybook code accessible to all docker containers (i.e. yggio apps) that make use of storybook.

If you want this process automated and the code auto-compiled, use 
```
$ yarn dev
```

# yggio-react-components (YRC) project and code conventions
* Build functional components and avoid classes
* Use the hooks and higher-order-components available when possible
* Use styled-components for styling

#### yggio-react-components directory explanation:
- assets - contains assets such as images used in the project
- components - contains generic reusable components, for example a button or a spinner
- constants - contains all the global constants
- global - contains other global stuff, such as global generic styled components
- hocs - contains custom generic higher order components very often used in panes
- hooks - contains generic custom react hooks used in the project
- utils - contains useful utilities such as the very useful form-wizard generator 
- yggio-connected-components - contains generic reusable components that are connected to yggio using yggio-context
- yggio-context - contains state and actions for yggio data
- yggio-managers - contains managers or "apps" such as device-manager or location-manager
- yggio-routing - contains yggio routing utilities

To see more specific documentation of each directory, find the README.md inside the directory.

# Developing yggio-react-components
1. Run `yarn start` in `yggio/storm/shared-modules/yggio-react-components`.
1. Create or edit the components you need.
1. Go to http://localhost:3001 to see your result!

# Developing using yggio compose
1. Create your yggio frontend service (see below) and add it to your yggio config
1. Start your yggio
1. Run `yarn dev` in `yggio/storm/shared-modules/yggio-react-components` for auto-compile (you can use `yarn compile` for manually compiling)
1. Start developing!

##### Common problems
1. It's common to forget to run `yarn` in root-dir and YRC. This is to generate a bundle configured to YOUR COMPUTER.
```
yarn && cd storm/shared-modules/yggio-react-comnents/ && yarn && yarn start
```
1. If SB does not automatically rebuild on save. This can be the solution: https://stackoverflow.com/questions/51622851/webpack-dev-server-does-not-rebuild-bundle.
```
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

# Developing an Yggio-frontend

## Creating a new front-end that utilizes YRC
From yggio-root you can run this to generate a new project stub:
```
bash tools/dev-scripts/create-yggio-frontend/create-yggio-frontend.sh $(pwd) my-awesome-app-name
```

## For continuous development in your app
YRC provides two commands for compiling the Storybook-components. `yarn compile` and `yarn dev`.

##### Problems
Currently, these commands will use absolute paths in generated files. Which is a problem when running in docker. For this we have temporarily created a script that will make the compiled files usable in Docker also. It's located here: `yggio/storm/shared-moduels/yggio-react-components/compile_for_local_docker.sh`. Unfortunately it needs to be run every time a component has changed.

### extras
[You can also find the documentation on YRC here.](https://gitlab.com/sensative/Yggio/-/wikis/shared-modules/yggio-react-components)

