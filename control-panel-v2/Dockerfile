FROM docker.sensative.net:8089/build-base:16.14.2-2 AS build

ARG yggio_version
ARG cmp
ENV CMP=${cmp}
ENV YGGIO_VERSION=${yggio_version}

COPY .yarn /dist/.yarn
COPY package.json /dist/
COPY .pnp.cjs /dist/
COPY .yarnrc.yml /dist/
COPY yarn.lock /dist/
COPY package.json /dist/

COPY storm/shared-modules/yggio-react-components /dist/storm/shared-modules/yggio-react-components
COPY $CMP /dist/$CMP

WORKDIR /dist/$CMP
CMD ["yarn", "start"]
