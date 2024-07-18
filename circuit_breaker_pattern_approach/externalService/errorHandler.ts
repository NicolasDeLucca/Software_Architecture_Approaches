const ERROR_400 = 'BAD_REQUEST';

const throwError = (metric_name: string) => {
    let e = new Error();
    e.name = ERROR_400;
    e.message = `${metric_name} metric input is invalid`;
    throw e;
};

export { throwError, ERROR_400 }