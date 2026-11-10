/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConstructionService {
  id: string;
  name: string;
  description: string;
  detailedDesc?: string;
  icon?: string;
  image?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  alt: string;
  category: string;
  title: string;
  desc: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role?: string;
  avatar?: string;
  text: string;
  rating: number;
  date: string;
}

export interface EstimateRequest {
  serviceType: string;
  city: string;
  notes: string;
  clientName: string;
  clientPhone: string;
}

