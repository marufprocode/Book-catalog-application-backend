/* eslint-disable no-unused-vars */
import { Document, Model, Schema } from 'mongoose';

export enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

export enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

export enum Label {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

export enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

export interface ICow extends Document {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  seller: Schema.Types.ObjectId; // Reference to the seller's ID
}

export type CowModel = Model<ICow, Record<string, unknown>>;

export interface IcowSearchAndFiletrs {
  searchTerm?: string;
  minPrice?: string;
  maxPrice?: string;
  location?: string;
  breed?: string;
  category?: string;
}
