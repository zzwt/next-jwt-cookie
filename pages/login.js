import React, { useEffect, useState } from "react";
import { Form, Message, Button, Segment, Icon } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { displayFormError, catchErrors, baseUrl } from "../utils";
import { handleLogin, redirectUser } from "../utils/auth";
import axios from "axios";
export default function Login({ user }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    errors,
    trigger,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (user) {
      redirectUser(null, "/account");
    }
    register(
      { name: "email" },
      {
        required: "Email is required",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Invalid email address",
        },
      }
    );
    register(
      { name: "password" },
      {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password at least 6 characters long",
        },
      }
    );
  }, []);

  const bindValue = (event, { name, value }) => {
    setValue(name, value);
    trigger(name);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${baseUrl}/api/login`;
      const payload = data;
      const response = await axios.post(url, payload);
      handleLogin(response.data);
    } catch (err) {
      catchErrors(err, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Message
        icon="key"
        header="Welcome Back!"
        content="Login with email and password"
        color="teal"
      />
      {error && (
        <Message header="Ooops, there're some issues" content={error} error />
      )}
      <Segment>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Input
            error={displayFormError(errors, "email")}
            label="Email"
            name="email"
            onChange={bindValue}
            icon="mail"
            iconPosition="left"
            placeholder="Email"
          />
          <Form.Input
            error={displayFormError(errors, "password")}
            label="Password"
            name="password"
            type="password"
            onChange={bindValue}
            icon="key"
            iconPosition="left"
            placeholder="Password"
          />
          <Button
            disabled={loading}
            loading={loading}
            icon="edit"
            color="orange"
            type="submit"
            content="Login"
          ></Button>
        </Form>
      </Segment>
      <Message warning>
        <Icon name="question" />
        No account?{" "}
        <Link href="/register">
          <a>Register here</a>
        </Link>{" "}
        instead
      </Message>
    </React.Fragment>
  );
}
