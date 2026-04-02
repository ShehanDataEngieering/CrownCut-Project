import React from 'react';
import { Delivery, Discount, Refund, Support } from '@svg';

interface FeatureItem {
  id: string;
  Icon: React.ComponentType;
  title: string;
  subtitle: string;
}

export const feature_data: FeatureItem[] = [
  {
    id: 'delivery',
    Icon: Delivery,
    title: 'Free Delivery',
    subtitle: 'Enjoy complimentary shipping on all orders over $250. Your precious gems delivered safely to your doorstep.'
  },
  {
    id: 'refund',
    Icon: Refund,
    title: 'Return and Refund',
    subtitle: "Easy returns and hassle-free refunds within 14 days if you're not completely satisfied."
  },
  {
    id: 'protection',
    Icon: Discount,
    title: 'Extend Protection',
    subtitle: 'Protect your investment with our extended care plan for lasting brilliance and peace of mind.'
  },
  {
    id: 'support',
    Icon: Support,
    title: 'Support 24/7',
    subtitle: 'Our expert support team is available around the clock to assist you anytime, anywhere.'
  },
];

const FeatureAreaOne: React.FC = () => {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .tp-feature-area.tp-feature-border-2 .tp-feature-icon-2 span {
              color: #B6AE9F !important;
            }
            .tp-feature-area.tp-feature-border-2 .tp-feature-icon-2 span svg {
              color: #B6AE9F !important;
              stroke: #B6AE9F !important;
            }
            .tp-feature-area.tp-feature-border-2 .tp-feature-item-2::after {
              display: none !important;
            }
            @media (max-width: 767px) {
              .tp-feature-col-divider {
                border-right: none !important;
              }
            }
          `,
        }}
      />
      <section className={`tp-feature-area tp-feature-border-2 pb-80`}>
        <div className="container">
          <div className="row align-items-stretch">
            {feature_data.map((item, index) => (
              <div
                key={item.id}
                className={`col-xl-3 col-lg-3 col-md-6 col-sm-6${index < feature_data.length - 1 ? " tp-feature-col-divider" : ""}`}
                style={index < feature_data.length - 1 ? { borderRight: "1px solid #D9DBDE" } : undefined}
              >
                <div className="tp-feature-item-2 d-flex align-items-start mb-40">
                  <div className="tp-feature-icon-2 mr-10">
                    <span>
                      <item.Icon />
                    </span>
                  </div>
                  <div className="tp-feature-content-2">
                    <h3 className="tp-feature-title-2">{item.title}</h3>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureAreaOne;
