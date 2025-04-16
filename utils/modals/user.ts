export interface UserModal {
  uuid: string;
  email: string;
  password: string;
  name?: string;
  phone?: string;
  photo?: string;
  user_type: "driver";
  rating?: string;
  is_online: boolean;
  is_verified: boolean;
  created_at?: Date;
  updated_at?: Date;

  firebase_id: string;
  timezone?: string;
  address?: string;
  address_coordinates?: string;
  android_fcm_token?: string;
  ios_fcm_token?: string;
  work_address_coordinates?: string;
  work_address?: string;
  car_model?: string;
  car_color?: string;
  license_plate?: string;
  total_rides?: number;
  total_earnings?: number;
  is_active?: boolean;
  last_location_lat?: number;
  last_location_lng?: number;
  last_location_updated_at?: Date;
  car_type?: string;
  car_year?: string;
}

interface ImageModal {
  name: string;
  imageUrl: string;
  type: string;
  size: number;
}

export const UserType = {
  Admin: 1,
  User: 2,
};

export const AvailableUserTypes = [
  { title: "Admin", value: "1" },
  { title: "User", value: "2" },
];

export const UserStatus = {
  ACTIVE: "active",
  HIDDEN: "hidden",
};

export const AvailableUserStatus = [
  { title: "Active", value: "active" },
  { title: "Hidden", value: "hidden" },
];
