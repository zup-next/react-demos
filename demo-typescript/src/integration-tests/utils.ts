import resources from '../store/resources'
import SagaTester from 'redux-saga-tester'
import { rootSaga } from '../store'
import { mapValues } from 'lodash'
import { Status, createResourceInitialState, Operation } from '@zup-it/redux-resource'
import ApiError from '../api/ApiError'
import { ReduxState } from '../types'

type SuccessType = 'LOAD_SUCCESS' | 'CREATE_SUCCESS' | 'UPDATE_SUCCESS' | 'REMOVE_SUCCESS'
type ErrorType = 'LOAD_ERROR' | 'CREATE_ERROR' | 'UPDATE_ERROR' | 'REMOVE_ERROR'

const testSuccess = async (resourceName: keyof ReduxState, operation: Operation, payload?: any) => {
  const resource = resources[resourceName]
  const successType = `${operation.toUpperCase()}_SUCCESS` as SuccessType

  const sagaTester = new SagaTester({
    reducers: mapValues(resources, 'reducer'),
  })

  sagaTester.start(rootSaga)
  sagaTester.dispatch(resource.actions[operation]())

  await sagaTester.waitFor(resource.types[successType])
  const state = sagaTester.getState() as ReduxState
  expect(state[resourceName]).toStrictEqual({
    ...createResourceInitialState(),
    data: payload || null,
    [operation]: { status: Status.success, error: null },
  })
}

const testError = async (
  resourceName: keyof ReduxState,
  operation: Operation,
  errorStatus: number,
  errorPayload: any,
) => {
  const resource = resources[resourceName]
  const errorType = `${operation.toUpperCase()}_ERROR` as ErrorType

  const sagaTester = new SagaTester({
    reducers: mapValues(resources, 'reducer'),
  })

  sagaTester.start(rootSaga)
  sagaTester.dispatch(resource.actions[operation]())

  await sagaTester.waitFor(resource.types[errorType])
  const state = sagaTester.getState() as ReduxState
  expect(state[resourceName]).toStrictEqual({
    ...createResourceInitialState(),
    [operation]: {
      status: Status.error,
      error: new ApiError(errorStatus, errorPayload),
    },
  })
}

type mock = {
  success: () => void,
  error: () => void,
}

interface TestResourceProps {
  resourceName: keyof ReduxState,
  mocks: {
    load?: mock,
    create?: mock,
    update?: mock,
    remove?: mock,
  },
  loadPayload?: any,
  errorStatus?: number,
  errorPayload: any,
}

export const testResource = ({
  resourceName,
  mocks,
  loadPayload,
  errorStatus = 500,
  errorPayload,
}: TestResourceProps) => {
  if (mocks.load) {
    it(`should load ${resourceName} successfully`, async () => {
      mocks.load!.success()
      await testSuccess(resourceName, 'load', loadPayload)
    })

    it(`should yield error while loading ${resourceName}`, async () => {
      mocks.load!.error()
      await testError(resourceName, 'load', errorStatus, errorPayload)
    })
  }

  if (mocks.create) {
    it(`should create ${resourceName} successfully`, async () => {
      mocks.create!.success()
      await testSuccess(resourceName, 'create')
    })

    it(`should yield error while creating ${resourceName}`, async () => {
      mocks.create!.error()
      await testError(resourceName, 'create', errorStatus, errorPayload)
    })
  }

  if (mocks.update) {
    it(`should update ${resourceName} successfully`, async () => {
      mocks.update!.success()
      await testSuccess(resourceName, 'update')
    })

    it(`should yield error while updating ${resourceName}`, async () => {
      mocks.update!.error()
      await testError(resourceName, 'update', errorStatus, errorPayload)
    })
  }

  if (mocks.remove) {
    it(`should remove ${resourceName} successfully`, async () => {
      mocks.remove!.success()
      await testSuccess(resourceName, 'remove')
    })

    it(`should yield error while removing ${resourceName}`, async () => {
      mocks.remove!.error()
      await testError(resourceName, 'remove', errorStatus, errorPayload)
    })
  }
}
