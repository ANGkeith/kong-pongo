import { constants } from './constants';

export const vars = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  KONG_VERSION: process.env.KONG_VERSION,
  KONG_CONTAINER_NAME: process.env.KONG_CONTAINER_NAME,
};

export const checkGwVars = () => {
  const missingVars: string[] = [];
  for (const envVar in vars) {
    if (!vars[envVar]) {
      missingVars.push(envVar);
    }
  }
  if (missingVars.length > 0) {
    throw new Error(
      `required gateway environment secrets not found: ${missingVars.join(
        ', '
      )}`
    );
  }
};

/**
 * Get current gateway host
 * @returns {string} - current gateway host
 */
export const getGatewayHost = (): string => {
  return process.env.GW_HOST || 'localhost';
};

/**
 * Get current gateway mode
 * @returns {string} - current gateway mode
 */
export const getGatewayMode = (): string => {
  return process.env.GW_MODE || 'classic';
};

/**
 * Check if cy=urrent gateway mode is hybrid
 * @returns {boolean} - true if gateway runs in hybrid mode else false
 */
export const isGwHybrid = (): boolean => {
  return getGatewayMode() === 'hybrid' ? true : false;
};

/**
 * Checks if GATEWAY_PASSWORD env var is set to return respective Auth header key:value
 */
export const gatewayAuthHeader = () => {
  return {
    authHeaderKey: constants.gateway.ADMIN_AUTH_HEADER,
    authHeaderValue: constants.gateway.ADMIN_PASSWORD,
  };
};
