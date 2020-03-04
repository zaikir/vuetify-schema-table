import Table from './Table.vue';
import Types from './types';
import PropsResolver from './propsResolver';

export const SchemaTable = Table;
export const types = Types;
export const propsResolver = PropsResolver;

export default {
  install: (Vue, options = {}) => {
    // eslint-disable-next-line no-param-reassign
    Vue.$schemaTable = options;
  },
};
