import { db } from '../index.js';
import { products } from '../schema/products.js';

async function seedProducts() {
  console.log('Starting seed...');
  try {
    await db.insert(products).values([
      {
        name: 'Car Shampoo Premium Foam',
        sku: 'CLN-001',
        price: '12.99',
        stockQuantity: 60,
        category: 'cleaning',
      },
      {
        name: 'Microfiber Towel Pack (5pcs)',
        sku: 'CLN-002',
        price: '9.99',
        stockQuantity: 100,
        category: 'cleaning',
      },
      {
        name: 'Interior Dashboard Cleaner',
        sku: 'CLN-003',
        price: '8.50',
        stockQuantity: 70,
        category: 'cleaning',
      },
      {
        name: 'Wheel Rim Cleaner Spray',
        sku: 'CLN-004',
        price: '11.00',
        stockQuantity: 45,
        category: 'cleaning',
      },
      {
        name: 'Glass Cleaner Anti-Fog',
        sku: 'CLN-005',
        price: '7.20',
        stockQuantity: 80,
        category: 'cleaning',
      },
      {
        name: 'Car Wax Polish Kit',
        sku: 'CLN-006',
        price: '19.99',
        stockQuantity: 40,
        category: 'cleaning',
      },
      {
        name: 'Foam Wash Gun',
        sku: 'CLN-007',
        price: '25.00',
        stockQuantity: 25,
        category: 'cleaning',
      },
      {
        name: 'Detailing Brush Set',
        sku: 'CLN-008',
        price: '14.50',
        stockQuantity: 55,
        category: 'cleaning',
      },

      // EXTERIOR PARTS
      {
        name: 'Front Bumper Sport Style',
        sku: 'EXT-001',
        price: '180.00',
        stockQuantity: 10,
        category: 'exterior_parts',
      },
      {
        name: 'Rear Diffuser Carbon Look',
        sku: 'EXT-002',
        price: '120.00',
        stockQuantity: 15,
        category: 'exterior_parts',
      },
      {
        name: 'Side Skirts Universal Fit',
        sku: 'EXT-003',
        price: '95.00',
        stockQuantity: 20,
        category: 'exterior_parts',
      },
      {
        name: 'Carbon Fiber Spoiler',
        sku: 'EXT-004',
        price: '150.00',
        stockQuantity: 12,
        category: 'exterior_parts',
      },
      {
        name: 'Mirror Caps Gloss Black',
        sku: 'EXT-005',
        price: '35.00',
        stockQuantity: 30,
        category: 'exterior_parts',
      },
      {
        name: 'Front Grille Sport Mesh',
        sku: 'EXT-006',
        price: '85.00',
        stockQuantity: 18,
        category: 'exterior_parts',
      },
      {
        name: 'Wheel Arch Trim Set',
        sku: 'EXT-007',
        price: '60.00',
        stockQuantity: 22,
        category: 'exterior_parts',
      },
      {
        name: 'Rear Lip Spoiler',
        sku: 'EXT-008',
        price: '70.00',
        stockQuantity: 25,
        category: 'exterior_parts',
      },

      // INTERIOR ACCESSORIES
      {
        name: 'Luxury Seat Cover Set',
        sku: 'INT-001',
        price: '110.00',
        stockQuantity: 18,
        category: 'interior_accessories',
      },
      {
        name: 'Steering Wheel Cover Leather',
        sku: 'INT-002',
        price: '25.00',
        stockQuantity: 40,
        category: 'interior_accessories',
      },
      {
        name: 'Car Floor Mats Premium',
        sku: 'INT-003',
        price: '45.00',
        stockQuantity: 35,
        category: 'interior_accessories',
      },
      {
        name: 'Dashboard Anti-Slip Mat',
        sku: 'INT-004',
        price: '12.00',
        stockQuantity: 60,
        category: 'interior_accessories',
      },
      {
        name: 'Phone Holder Adjustable',
        sku: 'INT-005',
        price: '15.00',
        stockQuantity: 75,
        category: 'interior_accessories',
      },
      {
        name: 'Car Sunshade Foldable',
        sku: 'INT-006',
        price: '10.00',
        stockQuantity: 90,
        category: 'interior_accessories',
      },
      {
        name: 'Air Freshener Vent Clip',
        sku: 'INT-007',
        price: '5.50',
        stockQuantity: 120,
        category: 'interior_accessories',
      },
      {
        name: 'Car Storage Organizer',
        sku: 'INT-008',
        price: '20.00',
        stockQuantity: 50,
        category: 'interior_accessories',
      },

      // LIGHTING
      {
        name: 'LED Headlight Bulbs H7',
        sku: 'LGT-001',
        price: '45.00',
        stockQuantity: 30,
        category: 'lighting',
      },
      {
        name: 'Interior Ambient Light Kit',
        sku: 'LGT-002',
        price: '35.00',
        stockQuantity: 25,
        category: 'lighting',
      },
      {
        name: 'Fog Light Upgrade Kit',
        sku: 'LGT-003',
        price: '40.00',
        stockQuantity: 20,
        category: 'lighting',
      },
      {
        name: 'DRL Daytime Running Lights',
        sku: 'LGT-004',
        price: '55.00',
        stockQuantity: 18,
        category: 'lighting',
      },
      {
        name: 'Underglow LED Kit RGB',
        sku: 'LGT-005',
        price: '60.00',
        stockQuantity: 15,
        category: 'lighting',
      },
      {
        name: 'Tail Light Smoke Tint',
        sku: 'LGT-006',
        price: '28.00',
        stockQuantity: 40,
        category: 'lighting',
      },
      {
        name: 'License Plate LED Light',
        sku: 'LGT-007',
        price: '12.00',
        stockQuantity: 80,
        category: 'lighting',
      },
      {
        name: 'Interior Dome LED Light',
        sku: 'LGT-008',
        price: '10.00',
        stockQuantity: 70,
        category: 'lighting',
      },

      // PERFORMANCE PARTS
      {
        name: 'High Performance Brake Pads',
        sku: 'PRF-001',
        price: '85.00',
        stockQuantity: 22,
        category: 'performance_parts',
      },
      {
        name: 'Cold Air Intake System',
        sku: 'PRF-002',
        price: '120.00',
        stockQuantity: 14,
        category: 'performance_parts',
      },
      {
        name: 'Sport Exhaust Tip',
        sku: 'PRF-003',
        price: '65.00',
        stockQuantity: 25,
        category: 'performance_parts',
      },
      {
        name: 'ECU Performance Chip',
        sku: 'PRF-004',
        price: '150.00',
        stockQuantity: 10,
        category: 'performance_parts',
      },
      {
        name: 'Lowering Springs Kit',
        sku: 'PRF-005',
        price: '110.00',
        stockQuantity: 12,
        category: 'performance_parts',
      },
      {
        name: 'Strut Bar Front',
        sku: 'PRF-006',
        price: '75.00',
        stockQuantity: 18,
        category: 'performance_parts',
      },
      {
        name: 'Turbo Sound Simulator',
        sku: 'PRF-007',
        price: '55.00',
        stockQuantity: 20,
        category: 'performance_parts',
      },
      {
        name: 'Oil Catch Can Kit',
        sku: 'PRF-008',
        price: '60.00',
        stockQuantity: 16,
        category: 'performance_parts',
      },

      // GENERAL ACCESSORIES
      {
        name: 'Emergency Road Kit',
        sku: 'GEN-001',
        price: '35.00',
        stockQuantity: 40,
        category: 'car_accessories_general',
      },
      {
        name: 'Jumper Cables Heavy Duty',
        sku: 'GEN-002',
        price: '25.00',
        stockQuantity: 55,
        category: 'car_accessories_general',
      },
      {
        name: 'Tow Rope 3 Ton',
        sku: 'GEN-003',
        price: '18.00',
        stockQuantity: 60,
        category: 'car_accessories_general',
      },
      {
        name: 'Car Vacuum Cleaner Portable',
        sku: 'GEN-004',
        price: '40.00',
        stockQuantity: 30,
        category: 'car_accessories_general',
      },
      {
        name: 'First Aid Kit Vehicle',
        sku: 'GEN-005',
        price: '20.00',
        stockQuantity: 70,
        category: 'car_accessories_general',
      },
      {
        name: 'USB Car Charger Fast Charge',
        sku: 'GEN-006',
        price: '15.00',
        stockQuantity: 90,
        category: 'car_accessories_general',
      },
      {
        name: 'Car Fire Extinguisher Mini',
        sku: 'GEN-007',
        price: '30.00',
        stockQuantity: 25,
        category: 'car_accessories_general',
      },
      {
        name: 'Parking Sensor Kit',
        sku: 'GEN-008',
        price: '50.00',
        stockQuantity: 20,
        category: 'car_accessories_general',
      },
    ]);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seedProducts()
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
  });
