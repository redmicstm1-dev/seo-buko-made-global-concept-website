export type Guide = { slug: string; title: string; description: string; intro: string; sections: { heading: string; paragraphs: string[]; bullets?: string[] }[]; relatedSlugs: string[] };

/** Educational guidance is general; confirm clinical and technical requirements with qualified staff and manufacturers. */
export const guides: Guide[] = [
  {
    slug: "choosing-an-ecg-machine",
    title: "How to Choose an ECG Machine for a Hospital or Diagnostic Centre",
    description: "A practical checklist for comparing ECG machines, recording formats, connectivity, accessories and support before requesting a quotation in Nigeria.",
    intro: "An electrocardiograph (ECG) records the electrical activity of the heart. When a facility is selecting an ECG machine, the best starting point is its clinical workflow and the requirements of the staff who will use it—not just the appearance of the device.",
    sections: [
      { heading: "Start with the intended workflow", paragraphs: ["Consider where ECG recordings will be taken: a consultation room, emergency department, ward, cardiology unit or diagnostic centre. The environment and expected workload help determine the features the team needs."] },
      { heading: "Confirm channels, recording and connectivity", paragraphs: ["Ask the supplier to confirm the number of channels, supported recording formats, display and print options, data export, network connectivity and compatibility with the facility's record systems. Do not assume every model supports the same functions."] },
      { heading: "Check consumables and accessories", paragraphs: ["Confirm the compatible patient cable, electrodes, paper size or roll format, power accessories and any other items needed for the intended setup. ECG paper dimensions and printer formats can differ between devices."], bullets: ["Check consumable compatibility and local replenishment arrangements.", "Confirm what accessories are included in the quotation.", "Ask about cleaning, maintenance, warranty and service support."] },
      { heading: "Prepare a useful quotation request", paragraphs: ["Include the facility type, intended use, quantity, preferred model if known, recording and connectivity requirements, and any relevant procurement specifications. This makes it easier to compare suitable options."] }
    ], relatedSlugs: ["medical-equipment-procurement-checklist", "selecting-a-patient-monitor"]
  },
  {
    slug: "selecting-a-patient-monitor",
    title: "What to Consider When Selecting a Patient Monitor",
    description: "Learn what to clarify about monitored parameters, alarms, accessories, clinical setting and support when sourcing patient monitoring equipment.",
    intro: "Patient monitors display selected physiological measurements so trained clinical staff can observe a patient's condition. The right configuration depends on the clinical setting, the patient population and the monitoring tasks required by the care team.",
    sections: [
      { heading: "Define the clinical setting", paragraphs: ["A general ward, emergency bay, recovery room and intensive-care environment may have different monitoring needs. Ask the clinical team to document the intended use and required parameters before comparing models."] },
      { heading: "Verify parameters and alarms", paragraphs: ["Confirm which measurements are supported by the specific configuration, which sensors or accessories are included, and how alarms are configured. Features vary by model; do not rely on a generic product name alone."] },
      { heading: "Check accessories and integration", paragraphs: ["Ask about compatible probes, cuffs, cables, mounting options, battery arrangements, data connectivity and any integration requirements. Verify that the proposed configuration is appropriate for the intended patient group and workflow."], bullets: ["List required measurements and alarm capabilities.", "Confirm compatible accessories and consumables.", "Ask about installation, training, maintenance and warranty arrangements."] },
      { heading: "Compare the full supply requirements", paragraphs: ["A useful enquiry describes the number of beds or care spaces to equip, the intended clinical use, any existing equipment that must be compatible, and the support arrangements the facility expects."] }
    ], relatedSlugs: ["choosing-an-ecg-machine", "medical-equipment-procurement-checklist"]
  },
  {
    slug: "medical-equipment-procurement-checklist",
    title: "A Medical Equipment Procurement Checklist for Clinics in Nigeria",
    description: "Use this checklist to prepare a clearer medical equipment enquiry, compare supplier responses and confirm requirements before committing to a purchase.",
    intro: "Planning medical equipment procurement involves more than identifying a product. A clear specification helps a clinic or hospital compare suitable configurations, understand what is included and reduce avoidable misunderstandings during the quotation process.",
    sections: [
      { heading: "Document the facility's needs", paragraphs: ["Start with the department, intended use, expected workload and quantity. Ask the relevant clinical or technical staff to identify the functions and minimum requirements before selecting a model."] },
      { heading: "Prepare a product specification", paragraphs: ["Where relevant, list dimensions, capacity, supported functions, power or utility needs, accessories, consumables, connectivity and applicable standards required by your facility. Avoid specifying features that have not been confirmed as necessary."] },
      { heading: "Ask suppliers clear questions", paragraphs: ["Request confirmation of the exact manufacturer and model, included accessories, product documentation, warranty, installation and training needs, maintenance arrangements, lead time and delivery terms. Ask for written clarification if an important detail is unclear."], bullets: ["Product name, model and quantity.", "Required specifications and accessories.", "Documentation, warranty and after-sales support.", "Delivery location, timing and quotation validity."] },
      { heading: "Review before confirming an order", paragraphs: ["Compare quotations against the original requirements rather than headline price alone. Confirm that the proposed configuration meets the facility's intended use and that any required installation, training, consumables or support are clearly described."] }
    ], relatedSlugs: ["choosing-an-ecg-machine", "selecting-a-patient-monitor"]
  }
];
