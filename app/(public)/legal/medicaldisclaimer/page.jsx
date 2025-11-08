'use client'
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-16 max-w-4xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Disclaimer</h1>
        </div>
        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

        <div className="space-y-8 text-foreground">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Medical Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided by ThrivBeat is for general informational and educational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or fitness program.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">No Professional Relationship</h2>
            <p className="text-muted-foreground leading-relaxed">
              Use of ThrivBeat's services does not establish a doctor-patient or therapist-client relationship. Our platform provides general fitness and wellness content that should not replace professional medical advice or treatment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Exercise and Health Risks</h2>
            <p className="text-muted-foreground leading-relaxed">
              Physical exercise involves inherent risks. Before beginning any exercise program, you should consult with your healthcare provider, especially if you:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
              <li>Have a history of heart disease or heart problems</li>
              <li>Experience chest pain, dizziness, or shortness of breath</li>
              <li>Have high blood pressure or other cardiovascular conditions</li>
              <li>Have bone or joint problems</li>
              <li>Are pregnant or recently gave birth</li>
              <li>Take medications regularly</li>
              <li>Are over 40 and have not been physically active</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Assumption of Risk</h2>
            <p className="text-muted-foreground leading-relaxed">
              By using ThrivBeat's services, you acknowledge and accept the risks associated with physical exercise. You agree to participate at your own risk and understand that you are responsible for listening to your body and exercising within your capabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">No Guarantees</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to provide high-quality content and services, we make no guarantees regarding specific results, weight loss, muscle gain, or health improvements. Individual results may vary based on numerous factors including dedication, genetics, diet, and overall health.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Third-Party Content</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our platform may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites. Use of third-party resources is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              ThrivBeat and its affiliates shall not be liable for any injuries, damages, or losses resulting from your use of our services, content, or exercise programs. This includes but is not limited to physical injuries, property damage, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Content Accuracy</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we make every effort to ensure the accuracy of our content, information on our platform may contain technical inaccuracies or typographical errors. Content is subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Emergency Situations</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you experience chest pain, severe shortness of breath, dizziness, or any other emergency symptoms during or after exercise, stop immediately and seek emergency medical attention. Call 911 or your local emergency number.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions regarding this disclaimer, please contact us at legal@thrivbeat.com
            </p>
          </section>
        </div>
      </motion.main>
    </div>
  );
};

export default Disclaimer;