const parseError = async (response) => {
  if (!response.ok) {
    let text = "";
    if (response.text) {
      text = await response.text();
    }
    throw Error(`${response.status} ${response.statusText} - ${response.url}\n${text}`)
  }
}

const postData = async (url, data, done, err) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    await parseError(response);
    let res = await response.json();

    if (done) {
      done(res);
    }
  } catch (e) {
    console.log("postData error", e)
    if (err) {
      err(e.message)
    }
  }
}

const fetchData = async (url, done, err) => {
  console.log("fetchData", url)
  try {
    const response = await fetch(url);
    await parseError(response)
    const res = await response.json();

    if (done) {
      done(res);
    }
  } catch (e) {
    console.log("fetchData error", e)
    if (err) {
      err(e.message)
    }
  }
}

export { postData, fetchData }