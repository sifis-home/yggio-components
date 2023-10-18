FROM node:20.5.0-bookworm AS build

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

COPY storm/shared-modules/ /dist/storm/shared-modules/
COPY $CMP /dist/$CMP

HEALTHCHECK \
  --start-period=30s \
  --interval=30s \
  --timeout=20s \
  CMD bash /dist/$CMP/healthcheck.sh

WORKDIR /dist/$CMP
CMD ["yarn", "start"]
