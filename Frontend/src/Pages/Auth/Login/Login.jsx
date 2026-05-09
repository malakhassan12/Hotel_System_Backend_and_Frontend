import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Group,
  Text,
  Anchor,
  Paper,
  Title,
  Container,
  Divider,
  Alert,
} from "@mantine/core";
import { useLogin } from "../../../Hooks/useLogin";

const Login = () => {
  const { loginUser, loading, serverError, setServerError } = useLogin();

  // Regex validation patterns
  const validation = {
    email: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
    password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => {
        if (!value || value.trim() === "") return "Email is required";
        if (!validation.email.test(value)) {
          return "Please enter a valid email address (e.g., name@example.com)";
        }
        return null;
      },

      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }
        if (!/[a-z]/.test(value)) {
          return "Password must contain at least one lowercase letter";
        }
        if (!/[0-9]/.test(value)) {
          return "Password must contain at least one number";
        }
        // if (!/[@$!%*?&#]/.test(value)) {
        //   return "Password must contain at least one special character (@$!%*?&#)";
        // }
        return null;
      },
    },

    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values) => {
    // Manual validation before submit
    const errors = form.validate();
    if (errors.hasErrors) {
      setServerError("Please fix the errors above before continuing");
      return;
    }

    setServerError("");
    const result = await loginUser(values);

    if (!result.success) {
      form.setFieldError("email", " ");
      form.setFieldError("password", " ");
    } else {
      form.reset();
    }
  };

  

  return (
    <Container size={480} my={40}>
      <Paper 
        radius="lg" 
        p={{ base: "xl", sm: "xl", md: "xl" }}
        withBorder 
        shadow="sm"
      >
        {/* Header */}
        <Stack align="center" gap="xs" mb="xl">
          <Title order={2} size="h2" ta="center">
            Welcome Back
          </Title>
          <Text size="sm" c="dimmed" ta="center">
            Sign in to your hotel management account
          </Text>
        </Stack>

        {/* Form */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            {/* Email */}
            <TextInput
              label="Email"
              placeholder="hello@example.com"
              size="md"
              radius="md"
              description="Enter your registered email address"
              {...form.getInputProps("email")}
            />

            {/* Password */}
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              size="md"
              radius="md"
              description="Use your account password"
              {...form.getInputProps("password")}
            />

            {/* Server Error */}
            {serverError && (
              <Alert 
                color="red" 
                title="Login Failed" 
                withCloseButton
                onClose={() => setServerError("")}
                radius="md"
                variant="light"
              >
                {serverError}
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              radius="md"
              bg="dark"
              c="white"
              loading={loading}
              mt="md"
              style={{ 
                height: 44,
                transition: "all 0.2s ease",
              }}
              styles={{
                root: {
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  },
                },
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Stack>
        </form>

        {/* Divider */}
        <Divider my="xl" label="or" labelPosition="center" />

        {/* Sign Up Link */}
        <Group justify="center">
          <Text size="sm" c="dimmed">
            Don't have an account?
          </Text>
          <Anchor 
            href="/register" 
            size="sm" 
            fw={600}
            c="dark"
            style={{ textDecoration: "none" }}
          >
            Sign up
          </Anchor>
        </Group>

      

        {/* Terms */}
        <Text size="xs" ta="center" c="dimmed" mt="lg">
          By signing in, you agree to our{" "}
          <Anchor href="/terms" size="xs" c="dark">
            Terms of Service
          </Anchor>{" "}
          and{" "}
          <Anchor href="/privacy" size="xs" c="dark">
            Privacy Policy
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
};

export default Login;