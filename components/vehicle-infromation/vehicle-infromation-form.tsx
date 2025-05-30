import { useAppDispatch, useTypedSelector } from '@/store';
import { useRouter } from 'expo-router';
import { Platform, View } from 'react-native';
import { Controller, useForm, yup, yupResolver } from '@/utils/react-hook-form';
import InputField from '@/components/ui/InputField';
import CustomButton from '../ui/CustomButton';
import Icons from '@/constants/icons';
import { VehicleModal } from '@/utils/modals/vehicle';
import { addVehicleDetails, editVehicleDetails } from '@/services/vehicle';
import { Select } from '../ui/select';
import { useEffect } from 'react';

export interface VehicleInfromationFormDataType {
  car_model: string | undefined;
  license_plate: string | undefined;
  car_color: string | undefined;
  car_year: number | undefined;
  ride_type_id: number | undefined;
}

const getVehicleInfromationFormData = (data: VehicleModal | null) => {
  return {
    car_model: data?.car_model || undefined,
    license_plate: data?.license_plate || undefined,
    car_color: data?.car_color || undefined,
    car_year: data?.car_year || undefined,
    ride_type_id: data?.ride_type_id || undefined,
  };
};

const schema = yup.object().shape({
  car_model: yup.string().required('Vehicle Model is required'),
  license_plate: yup.string().required('License Plate is required'),
  car_color: yup.string().required('Vehicle Color is required'),
  car_year: yup
    .number()
    .required('Vehicle Year is required')
    .min(1900, 'Vehicle Year must be 1900 or later')
    .max(new Date().getFullYear(), `Vehicle Year cannot be in the future`),
  ride_type_id: yup.number().required('Vehicle Type is required'),
});

const VehicleInfromationForm = () => {
  const { vehicleDetails, vehicleDetailsLoading, isEditMode } = useTypedSelector(
    (state) => state.Vehicle
  );
  const { rideTypes } = useTypedSelector((state) => state.Ride);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<VehicleInfromationFormDataType>({
    defaultValues: getVehicleInfromationFormData(vehicleDetails),
    //@ts-ignore
    resolver: yupResolver(schema),
  });

  const handleSaveVehicleDetailsInfo = (data: any) => {
    if (vehicleDetails) {
      dispatch(editVehicleDetails({ data: data }));
    } else {
      dispatch(addVehicleDetails({ data: data }));
    }
  };

  // Reset form when vehicleDetails loads
  useEffect(() => {
    if (vehicleDetails) {
      reset(getVehicleInfromationFormData(vehicleDetails));
    }
  }, [vehicleDetails]);

  return (
    <View className="w-full h-auto bg-white rounded-lg flex flex-col items-center gap-5 p-5">
      <Controller
        control={control}
        name="car_model"
        render={({ field: { onChange } }) => (
          <InputField
            containerStyle={`bg-secondary-300 ${!isEditMode && 'border-0'}`}
            label="Vehicle Model"
            placeholder="eg. Tesla"
            value={
              isEditMode
                ? watch('car_model')
                : vehicleDetails?.car_model
                  ? vehicleDetails?.car_model
                  : 'Not Provided'
            }
            onChangeText={onChange}
            editable={!isEditMode ? false : vehicleDetailsLoading ? false : true}
            error={isEditMode ? errors.car_model?.message : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="license_plate"
        render={({ field: { onChange } }) => (
          <InputField
            containerStyle={`bg-secondary-300 ${!isEditMode && 'border-0'}`}
            label="License Plate"
            placeholder="eg. EV-1234"
            value={
              isEditMode
                ? watch('license_plate')
                : vehicleDetails?.license_plate
                  ? vehicleDetails.license_plate
                  : 'Not Provided'
            }
            onChangeText={onChange}
            editable={!isEditMode ? false : vehicleDetailsLoading ? false : true}
            error={isEditMode ? errors.license_plate?.message : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="car_color"
        render={({ field: { onChange } }) => (
          <InputField
            containerStyle={`bg-secondary-300 ${!isEditMode && 'border-0'}`}
            label="Vehicle Color"
            placeholder="eg. Red"
            value={
              isEditMode
                ? watch('car_color')
                : vehicleDetails?.car_color
                  ? vehicleDetails.car_color
                  : 'Not Provided'
            }
            onChangeText={onChange}
            editable={!isEditMode ? false : vehicleDetailsLoading ? false : true}
            error={isEditMode ? errors.car_color?.message : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="car_year"
        render={({ field: { onChange } }) => (
          <InputField
            keyboardType="numeric"
            containerStyle={`bg-secondary-300 ${!isEditMode && 'border-0'}`}
            label="Vehicle Year"
            placeholder="eg. 2024"
            value={
              isEditMode
                ? watch('car_year')?.toString()
                : vehicleDetails?.car_year?.toString()
                  ? vehicleDetails?.car_year?.toString()
                  : 'Not Provided'
            }
            onChangeText={onChange}
            editable={!isEditMode ? false : vehicleDetailsLoading ? false : true}
            error={isEditMode ? errors.car_year?.message : undefined}
          />
        )}
      />
      <Controller
        control={control}
        name="ride_type_id"
        render={({ field: { onChange } }) => (
          <Select
            containerStyle={`bg-secondary-300 ${!isEditMode && 'border-0'} ${Platform.OS === 'ios' ? 'px-3 py-8' : 'px-2'}`}
            label="Vehicle Type"
            placeholder="eg. Suv"
            options={rideTypes?.map((item) => ({ value: item.id.toString(), label: item.name }))}
            value={
              isEditMode
                ? watch('ride_type_id')?.toString()
                : vehicleDetails?.ride_type_id
                  ? vehicleDetails.ride_type_id?.toString()
                  : 'Not Provided'
            }
            onChange={onChange}
            error={isEditMode ? errors.ride_type_id?.message : undefined}
            disabled={!isEditMode ? true : vehicleDetailsLoading ? true : false}
          />
        )}
      />

      <CustomButton
        title={isEditMode ? 'Save Vehicle Infromation' : 'Sync with Admin Panel'}
        titleStyle={'font-bold'}
        className={`${Platform.OS === 'ios' ? 'py-4' : 'py-3'} gap-2 ${isEditMode ? 'bg-tertiary-300' : ''}`}
        onPress={handleSubmit(handleSaveVehicleDetailsInfo)}
        disabled={!isEditMode ? true : vehicleDetailsLoading ? true : false} // TODO: currently for sync with admin panel button is disable
        IconLeft={isEditMode ? undefined : <Icons.RefreshCcw color={'#FFFFFF'} size={20} />}
      />
    </View>
  );
};

export default VehicleInfromationForm;
