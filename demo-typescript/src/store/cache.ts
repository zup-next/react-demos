import { createCacheManager } from '@zup-next/redux-action-cache'
import resources from './resources'

const { profile, wallet, catalog, order } = resources

const cacheManager = createCacheManager({
  include: [profile.types.LOAD, wallet.types.LOAD, catalog.types.LOAD],
  invalidations: [
    { type: 'pattern', invalidatedBy: /(.+)\/LOAD_ERROR$/, invalidated: '$1/LOAD' },
    { invalidatedBy: order.types.CREATE_SUCCESS, invalidated: wallet.types.LOAD },
  ],
})

export default cacheManager
