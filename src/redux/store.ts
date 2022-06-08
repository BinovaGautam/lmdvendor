import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { repairRequestsApi } from '../services/RepairRequestsApi';
import { repairTypesApi } from '../services/RepairTypesApi';
import { vehicleApi } from '../services/VehicleApi';
import { vehicleServeritiesApi } from '../services/VehicleSeveritiesApi';
import { authApi } from '../services/AuthApi';
import { userSaga } from './sagas/userSaga';
import { quotationApi } from '../services/QuotationApi';

let sagaMiddleware = createSagaMiddleware();

const middleware = [
  sagaMiddleware,

  authApi.middleware,
  vehicleApi.middleware,
  repairTypesApi.middleware,
  repairRequestsApi.middleware,
  vehicleServeritiesApi.middleware,
  quotationApi.middleware,
];

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
    [repairTypesApi.reducerPath]: repairTypesApi.reducer,
    [repairRequestsApi.reducerPath]: repairRequestsApi.reducer,
    [vehicleServeritiesApi.reducerPath]: vehicleServeritiesApi.reducer,
    [quotationApi.reducerPath]: quotationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(userSaga);
