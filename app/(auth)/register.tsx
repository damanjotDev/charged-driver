import CustomButton from "@/components/ui/CustomButton";
import InputField from "@/components/ui/InputField";
import images from "@/constants/images";
import { Controller, useForm, yup, yupResolver } from "@/utils/react-hook-form";
import { Link } from "expo-router";
import { Image, Platform, ScrollView, Text, View } from "react-native";

export interface RegisterFormDataType {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerFormData: RegisterFormDataType = {
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password length should be min 6").required("Password is required"),
  confirmPassword: yup
    .string()
    .min(6, "Password length should be min 6")
    .required("Confirm password is required"),
});

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormDataType>({
    defaultValues: {
      email: registerFormData?.email || "",
      password: registerFormData?.password || "",
      confirmPassword: registerFormData?.confirmPassword || "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormDataType) => {
    console.log("433>>>>>>", data);
  };

  return (
    <ScrollView className="flex-1 bg-secondary-300">
      <View className="min-h-screen w-full flex flex-col items-center justify-center px-7">
        <View className="w-full flex flex-col items-center justify-center gap-6">
          <View className="flex items-center justify-center h-[205px] w-[205px] rounded-full bg-white">
            <Image
              source={images.driverCharged}
              className="h-[200px] w-[200px]"
              resizeMode="contain"
            />
          </View>

          <View className="flex flex-col items-center justify-center gap-1">
            <View className="flex">
              <Text className="text-3xl font-bold">Charged Driver</Text>
            </View>
            <View className="flex">
              <Text className="text-lg text-text-300">Register to your account</Text>
            </View>
          </View>
        </View>

        <View className="w-full flex flex-col justify-center gap-5 mt-12">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputField
                keyboardType="email-address"
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                editable={true}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                editable={true}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder="Confirm password"
                value={value}
                onChangeText={onChange}
                editable={true}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          <CustomButton
            title="Register"
            className={`${Platform.OS === "ios" ? "py-4" : "py-3"}`}
            onPress={handleSubmit(onSubmit)}
          />

          <View className="w-full flex flex-row items-center justify-center gap-1">
            <View className="block">
              <Text className=" text-text-300">Already have an account?</Text>
            </View>
            <View className="block">
              <Link href="/login" className="text-primary-300">
                Login
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;
