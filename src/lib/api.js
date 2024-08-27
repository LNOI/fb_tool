"use server";
import { cookies } from "next/headers";
// import { auth } from "@/auth";
// import { MockData } from "@/data/mock_data";
// import { boolean } from "zod";
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL; // Replace with your actual API base URL

const handleErrors = (response) => {
  if (!response.ok) {
    throw Error(`API request failed with status ${response.status}`);
  }
  return response;
};

const get = async (endpoint, params = {}) => {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    // const session = await auth();
    // console.log(session)
    url.search = new URLSearchParams(params);
    console.log(url);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + session.access_token,
      },
    });
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw Error(`API GET request failed: ${error.message}`);
  }
};

const post = async (endpoint, data) => {
  //   const session = await auth();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + session.access_token,
      },
      body: JSON.stringify(data),
    });
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    throw Error(`API POST request failed: ${error.message}`);
  }
};

const put = async (endpoint, data) => {
  const session = await auth();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session.access_token,
      },
      body: JSON.stringify(data),
    });
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    console.log(error);
    throw Error(`API PUT request failed: ${error.message}`);
  }
};

const del = async (endpoint) => {
  const session = await auth();
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + session.access_token,
      },
    });
    await handleErrors(response);
    return await response.json();
  } catch (error) {
    throw Error(`API DELETE request failed: ${error.message}`);
  }
};

export { get, post, put, del };
