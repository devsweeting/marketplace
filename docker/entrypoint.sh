#!/bin/bash
echo "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
if [[ "$NODE_ENV" == "develop" ]]; then
  yarn dev
else
  yarn start
fi
