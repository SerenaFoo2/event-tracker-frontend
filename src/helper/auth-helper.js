/*return reqHeader obj for public routes*/
function getRequestHeader(requestMethod, payloadObj = {}) {
  requestMethod = requestMethod.toLowerCase();
  const reqHeader = {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
    },
    //get method cannot have body.
    body: requestMethod === "get" ? null : JSON.stringify(payloadObj),
  };
  return reqHeader;
}

export { getRequestHeader };
