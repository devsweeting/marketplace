#!/bin/bash
if [[ "$NODE_ENV" == "develop" ]]; then
  yarn dev
else
  yarn start
fi
