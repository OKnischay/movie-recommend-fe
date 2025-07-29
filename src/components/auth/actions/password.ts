export const sendMail = async (payload: any) => {
  try {
    const response = await fetch(`http://localhost:8000/api/authentication/password/forgot/mail/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData?.message);
      return { error: errorData, status: response.status };
    }

    const data = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error("Network error:", error);
    return { error: { message: "Network request failed" }, status: 500 };
  }
};

export const forgotPassword = async (payload: any) => {
  try {
    const response = await fetch(`http://localhost:8000/api/authentication/password/forgot/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData?.message);
      return errorData;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Async handler error:", error);
    return error;
  }
};