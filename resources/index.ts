import * as pulumi from "@pulumi/pulumi";

const configInstance = new pulumi.Config()

export const config = {
    ENVIRONMENT: configInstance.require('environment')
}

