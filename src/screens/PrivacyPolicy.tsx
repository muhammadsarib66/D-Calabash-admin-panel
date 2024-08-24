import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 border-b pb-2">Privacy Policy for D'calabash</h1>
                <p className="text-gray-600 mb-6"><strong>Effective Date:</strong> <span className="text-primary">1<sup>st</sup> August 2024</span></p>

                <p className="text-gray-700 mb-8">
                    Welcome to D'calabash. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect the information you provide to us when using our app.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Information We Collect</h2>
                <p className="text-gray-700 mb-4">
                    When you use D'calabash, we may collect the following types of personal information:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                    <li><strong>Email Address:</strong> We collect your email address for OTP (One-Time Password) confirmation during account registration and for sending order updates.</li>
                    <li><strong>Password:</strong> We collect and store your password securely for account access.</li>
                    <li><strong>Phone Number:</strong> We collect your phone number to facilitate communication related to order delivery.</li>
                    <li><strong>Address:</strong> We collect your delivery address to ensure that your orders are delivered to the correct location.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-8">
                    The information we collect is used for the following purposes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-8">
                    <li><strong>OTP Confirmation:</strong> Your email address is used to send you a one-time password to confirm your identity during account registration.</li>
                    <li><strong>Order Updates:</strong> We use your email address to send you updates about your order status.</li>
                    <li><strong>Order Delivery:</strong> Your phone number and address are used to ensure that your orders are delivered accurately and efficiently.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Sharing Your Information</h2>
                <p className="text-gray-700 mb-8">
                    We do not share, sell, or rent your personal information to third parties, except as necessary to process your orders and ensure successful delivery. This may include sharing your address with our delivery partners.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-8">
                    We take data security seriously and implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Your password is encrypted and stored securely.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Your Rights</h2>
                <p className="text-gray-700 mb-8">
                    You have the right to access, update, or delete your personal information at any time. If you wish to exercise these rights, please contact us at <span className="text-primary">dcalabash@dcalabash.ca</span>.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-8">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Any changes will be posted within the app, and we will notify you of significant changes by email.
                </p>

                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
                <p className="text-gray-700">
                    If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>

                <div className="bg-gray-100 rounded-lg p-6 mt-4">
                    <p className="text-gray-800"><strong>D'calabash Support</strong></p>
                    <p className="text-gray-600">Email: <span className="text-primary">dcalabash@dcalabash.ca</span></p>
                    <p className="text-gray-600">Phone: <span className="text-primary">306-559-1110</span></p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
