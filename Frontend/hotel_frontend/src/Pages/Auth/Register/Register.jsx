import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Stack,
  Group,
  Text,
  Anchor,
  Divider,
  Box,
  Alert,
  Paper,
  Title,
  Container,
} from "@mantine/core";
import { useRegister } from "../../../Hooks/useRegister";
import { roles } from "../../../Constants/ConstantsFromBack";

const Register = () => {
  const { registerUser, loading, serverError, setServerError } = useRegister();

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      Confirmpassword: "",
      role: roles[1],
      phone: "",
    },

    validate: {
      username: (value) => {
        if (!value || value.trim() === "") return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        if (value.length > 50)
          return "Username must be less than 50 characters";
        // ✅ Allow spaces, letters (English/Arabic), numbers
        if (!/^[a-zA-Z\u0600-\u06FF0-9\s]{3,50}$/.test(value)) {
          return "Username can contain letters, numbers, and spaces only";
        }
        return null;
      },

      email: (value) => {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address (e.g., name@example.com)";
        }
        return null;
      },

      password: (value) => {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/[A-Z]/.test(value))
          return "Password must contain at least one uppercase letter";
        if (!/[a-z]/.test(value))
          return "Password must contain at least one lowercase letter";
        if (!/[0-9]/.test(value))
          return "Password must contain at least one number";
        // ✅ Allow special characters
        // if (!/[@$!%*?&#]/.test(value)) {
        //   return "Password must contain at least one special character (@$!%*?&#)";
        // }
        return null;
      },

      Confirmpassword: (value, values) => {
        if (!value) return "Please confirm your password";
        if (value !== values.password) return "Passwords do not match";
        return null;
      },

      role: (value) => {
        if (!value) return "Please select a role";
        return null;
      },

      phone: (value) => {
        if (!value) return "Phone is required";

        const phoneRegex = /^01[0-9]{9}$/;

        if (!phoneRegex.test(value)) {
          return "Invalid phone number";
        }

        return null;
      },
    },

    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleSubmit = async (values) => {
    console.log("Form values:", values);

    // Manual validation before submit
    const errors = form.validate();
    if (errors.hasErrors) {
      console.log("Validation errors:", errors.errors);
      setServerError("Please fix the errors above before continuing");
      return;
    }

    setServerError("");

    

    const { success } = await registerUser(values);
    if (success) {
      form.reset();
    }
  };

  // Password strength calculation
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    // if (/[@$!%*?&#]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(form.values.password);
  const strengthText =
    passwordStrength === 0
      ? "Very Weak"
      : passwordStrength === 1
        ? "Weak"
        : passwordStrength === 2
          ? "Fair"
          : // : passwordStrength === 3
            //   ? "Good"
            "Strong";

  const strengthColor =
    passwordStrength === 0
      ? "#fa5252"
      : passwordStrength === 1
        ? "#ff922b"
        : passwordStrength === 2
          ? "#fcc419"
          : passwordStrength === 3
            ? "#69db7e"
            : "#51cf66";

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
            Create Account
          </Title>
          <Text size="sm" c="dimmed" ta="center">
            Join our hotel management system
          </Text>
        </Stack>

        {/* Form */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            {/* Username */}
            <TextInput
              label="Username"
              size="md"
              radius="md"
              placeholder="Confirm your Name"
              description="Can contain letters, numbers, and spaces"
              {...form.getInputProps("username")}
            />

            {/* Email */}
            <TextInput
              label="Email"
              size="md"
              radius="md"
              placeholder="Confirm your Email"
              {...form.getInputProps("email")}
            />

            {/* Password */}
            <PasswordInput
              label="Password"
              size="md"
              radius="md"
              placeholder="Confirm your Password"
              description="8+ chars with uppercase, lowercase, number & special character"
              {...form.getInputProps("password")}
            />

            {/* Password Strength */}
            {form.values.password && !form.errors.password && (
              <Box>
                <div
                  style={{
                    height: 4,
                    background: "#e9ecef",
                    borderRadius: 2,
                    overflow: "hidden",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: `${(passwordStrength / 5) * 100}%`,
                      height: "100%",
                      background: strengthColor,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <Text size="xs" c={strengthColor}>
                  Password strength: {strengthText}
                </Text>
              </Box>
            )}

            {/* Confirm Password */}
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              size="md"
              radius="md"
              {...form.getInputProps("Confirmpassword")}
            />

            {/* Role Selection */}
            <Select
              label="Account Type"
              placeholder="Select your role"
              size="md"
              radius="md"
              data={[
                {
                  value: roles[1],
                  label: "Customer ",
                },
                {
                  value: roles[2],
                  label: "Receptionist ",
                },
                { value: roles[0], label: "Admin" },
              ]}
              {...form.getInputProps("role")}
            />

            <TextInput
              label="Phone number"
              size="md"
              radius="md"
              placeholder="Confirm your Phone Number"
              {...form.getInputProps("phone")}
            />
            {/* Error Display - More Specific */}
            {serverError && (
              <Alert
                color="red"
                title="Registration Failed"
                withCloseButton
                onClose={() => setServerError("")}
                radius="md"
              >
                {serverError}
                {form.errors.username && (
                  <Text size="sm" mt="xs">
                    • {form.errors.username}
                  </Text>
                )}
                {form.errors.email && (
                  <Text size="sm" mt="xs">
                    • {form.errors.email}
                  </Text>
                )}
                {form.errors.password && (
                  <Text size="sm" mt="xs">
                    • {form.errors.password}
                  </Text>
                )}
                {form.errors.Confirmpassword && (
                  <Text size="sm" mt="xs">
                    • {form.errors.Confirmpassword}
                  </Text>
                )}
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
              style={{ height: 44 }}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </Stack>
        </form>

        {/* Divider */}
        <Divider my="xl" label="or" labelPosition="center" />

        {/* Login Link */}
        <Group justify="center">
          <Text size="sm" c="dimmed">
            Already have an account?
          </Text>
          <Anchor href="/login" size="sm" fw={600} c="dark">
            Sign In
          </Anchor>
        </Group>

        {/* Terms */}
        <Text size="xs" ta="center" c="dimmed" mt="lg">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </Text>
      </Paper>
    </Container>
  );
};

export default Register;
