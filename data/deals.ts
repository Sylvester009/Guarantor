export interface Deal {
    id: string;
    userId: string;
    title: string;
    creator: string;
    description: string;
    createdAt: string;
    deadline: string;
    status: string;
    counterparty?: string;
    counterpartyId?: string;
    inviteStatus?: string;
    terms?: string;
    participants?: number;
    updates?: number;
    pages?: number;
    wordCount?: string;
    version?: string;
    fullContract?: string; 
}

// export const deals: Deal[] = [
//     {
//         id: "001",
//         userId: user.id,
//         title: "Software Development Agreement",
//         creator: "Sylvester",
//         description: "A comprehensive software development agreement between Sylvester and TechCorp Inc. for the development of a custom enterprise software solution.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-15",
//         status: "Pending",
//         counterparty: "TechCorp Inc.",
//         terms: "The developer agrees to deliver the software product according to the specifications outlined in Exhibit A. Payment will be released upon successful completion of each milestone.",
//         fullContract: `This Software Development Agreement (the "Agreement") is entered into on January 1, 2026, by and between Sylvester (the "Developer") and TechCorp Inc. (the "Client").

// 1. SCOPE OF WORK
// The Developer agrees to develop, test, and deploy a custom enterprise software solution as detailed in the technical specifications attached as Exhibit A.

// 2. DELIVERY SCHEDULE
// The software shall be delivered in four phases:
// - Phase 1: Requirements gathering and system architecture (Due: February 1, 2026)
// - Phase 2: Core development and database design (Due: March 15, 2026)
// - Phase 3: Testing and quality assurance (Due: April 15, 2026)
// - Phase 4: Deployment and training (Due: May 15, 2026)

// 3. PAYMENT TERMS
// Payment will be released upon successful completion of each milestone:
// - Milestone 1: 25% upon signing
// - Milestone 2: 25% upon Phase 1 completion
// - Milestone 3: 25% upon Phase 2 completion
// - Milestone 4: 25% upon final delivery and acceptance

// 4. INTELLECTUAL PROPERTY
// All intellectual property rights, including source code, documentation, and related materials, shall be transferred to the Client upon full payment.

// 5. CONFIDENTIALITY
// Both parties agree to maintain the confidentiality of all proprietary information shared during the engagement.`,
//         participants: 4,
//         updates: 3,
//         pages: 14,
//         wordCount: "5,200",
//         version: "2.1",
//     },
//     {
//         id: "002",
//         userId: user.id,
//         title: "Real Estate Purchase Contract",
//         creator: "Samuel",
//         description: "A real estate purchase agreement for the acquisition of commercial property located at 123 Main Street.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-25",
//         status: "Pending",
//         counterparty: "Haven Properties LLC",
//         terms: "The buyer agrees to purchase the property at 123 Main Street for the agreed purchase price. The closing date shall be no later than 30 days after acceptance.",
//         fullContract: `This Real Estate Purchase Contract (the "Contract") is made on January 1, 2026, between Samuel (the "Buyer") and Haven Properties LLC (the "Seller").

// 1. PROPERTY DESCRIPTION
// The Seller agrees to sell and the Buyer agrees to purchase the commercial property located at 123 Main Street, including all fixtures and improvements.

// 2. PURCHASE PRICE
// The purchase price for the property is set at $1,200,000 to be paid as follows:
// - Earnest money deposit: $50,000 (due upon signing)
// - Balance: $1,150,000 (due at closing)

// 3. CLOSING DATE
// The closing shall occur on or before May 25, 2026, unless otherwise agreed in writing.

// 4. CONDITIONS PRECEDENT
// This Agreement is contingent upon:
// - Satisfactory property inspection (due by March 1, 2026)
// - Clear title search (due by April 1, 2026)
// - Financing approval (due by April 15, 2026)

// 5. DEFAULT
// In the event of default by the Buyer, the earnest money deposit shall be forfeited to the Seller as liquidated damages.`,
//         participants: 6,
//         updates: 2,
//         pages: 22,
//         wordCount: "8,400",
//         version: "1.3",
//     },
//     {
//         id: "003",
//         userId: user.id,
//         title: "Service Level Agreement",
//         creator: "Alex",
//         description: "A service level agreement between Alex and CloudServe Solutions for cloud infrastructure services.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-30",
//         status: "Pending",
//         counterparty: "CloudServe Solutions",
//         terms: "The service provider shall maintain 99.9% uptime for all critical services. Response times for P1 incidents shall not exceed 15 minutes.",
//         fullContract: `This Service Level Agreement (the "SLA") is entered into on January 1, 2026, by Alex (the "Client") and CloudServe Solutions (the "Provider").

// 1. SERVICE DESCRIPTION
// The Provider shall deliver cloud infrastructure services including:
// - Virtual machine hosting
// - Data storage and backup
// - Network connectivity
// - Security monitoring

// 2. SERVICE LEVEL COMMITMENTS
// - Uptime: 99.9% monthly availability
// - Incident Response Times:
//   - P1 (Critical): 15 minutes
//   - P2 (High): 1 hour
//   - P3 (Normal): 4 hours
//   - P4 (Low): 24 hours

// 3. SERVICE CREDITS
// If the Provider fails to meet the service level commitments, Service Credits shall be applied as follows:
// - 99.0% - 99.8%: 10% credit
// - 98.0% - 98.9%: 25% credit
// - Below 98.0%: 50% credit

// 4. TERM AND TERMINATION
// This Agreement shall commence on January 1, 2026, and continue for a period of 12 months.

// 5. MAINTENANCE WINDOWS
// Scheduled maintenance shall be performed during the maintenance window of 2:00 AM - 4:00 AM EST, with at least 7 days' notice.`,
//         participants: 5,
//         updates: 4,
//         pages: 18,
//         wordCount: "6,700",
//         version: "3.0",
//     },
//     {
//         id: "004",
//         userId: user.id,
//         title: "Marketing Partnership Deal",
//         creator: "Chisom",
//         description: "A marketing partnership agreement between Chisom and BrandBoost Agency for a 6-month collaborative campaign.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-04",
//         status: "Completed",
//         counterparty: "BrandBoost Agency",
//         terms: "Both parties will collaborate on a 6-month marketing campaign. Budget allocation and creative direction must be approved by both parties before execution.",
//         fullContract: `This Marketing Partnership Agreement (the "Agreement") is entered into on January 1, 2026, between Chisom (the "Client") and BrandBoost Agency (the "Agency").

// 1. CAMPAIGN OBJECTIVES
// The parties agree to collaborate on a comprehensive marketing campaign with the following objectives:
// - Increase brand awareness by 40%
// - Generate 1,000 qualified leads
// - Achieve 15% conversion rate

// 2. CAMPAIGN PHASES
// Phase 1: Strategy & Creative Development (January - February 2026)
// Phase 2: Content Production (March 2026)
// Phase 3: Campaign Launch & Execution (April 2026)
// Phase 4: Optimization & Reporting (May - June 2026)

// 3. BUDGET ALLOCATION
// Total budget: $250,000
// - Creative Development: $50,000
// - Media Buy: $150,000
// - Production: $30,000
// - Analytics & Optimization: $20,000

// 4. APPROVAL PROCESS
// All creative assets and campaign strategies require written approval from both parties before execution.

// 5. PERFORMANCE METRICS
// Campaign success will be measured based on:
// - ROI (Return on Investment)
// - CPC (Cost Per Click)
// - CPA (Cost Per Acquisition)
// - Conversion Rate`,
//         participants: 8,
//         updates: 7,
//         pages: 16,
//         wordCount: "5,800",
//         version: "2.4",
//     },
//     {
//         id: "005",
//         userId: user.id,
//         title: "Consulting Services Contract",
//         creator: "Favour",
//         description: "A 12-month consulting services agreement between Favour and Strategic Growth Partners for strategic business advisory.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-05",
//         status: "Completed",
//         counterparty: "Strategic Growth Partners",
//         terms: "The consultant will provide strategic advisory services for a period of 12 months. Deliverables include quarterly business reviews and growth strategy reports.",
//         fullContract: `This Consulting Services Agreement (the "Agreement") is made on January 1, 2026, between Favour (the "Client") and Strategic Growth Partners (the "Consultant").

// 1. ENGAGEMENT SCOPE
// The Consultant agrees to provide strategic advisory services including:
// - Business growth strategy development
// - Market analysis and competitive intelligence
// - Operational efficiency optimization
// - Organizational restructuring recommendations

// 2. DELIVERABLES
// - Quarterly Business Reviews (QBRs)
// - Strategic Growth Reports
// - Market Intelligence Briefs
// - Operational Assessment Reports

// 3. ENGAGEMENT TERM
// The term of this engagement shall be 12 months, commencing January 1, 2026.

// 4. COMPENSATION
// Monthly retainer: $15,000
// Performance bonus: Up to $50,000 based on achieving agreed KPIs

// 5. INTELLECTUAL PROPERTY
// All deliverables, including reports, strategies, and recommendations, shall become the sole property of the Client upon full payment.`,
//         participants: 3,
//         updates: 5,
//         pages: 12,
//         wordCount: "4,200",
//         version: "1.8",
//     },
//     {
//         id: "006",
//         userId: user.id,
//         title: "Joint Venture Agreement",
//         creator: "Ghost",
//         description: "A joint venture agreement between Ghost and Innovation Labs Ltd for AI-powered solution development.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-06",
//         status: "Active",
//         counterparty: "Innovation Labs Ltd",
//         terms: "Both entities agree to form a joint venture for the development of AI-powered solutions. Profits and liabilities shall be shared equally between parties.",
//         fullContract: `This Joint Venture Agreement (the "Agreement") is entered into on January 1, 2026, between Ghost and Innovation Labs Ltd (collectively the "Parties").

// 1. JOINT VENTURE PURPOSE
// The Parties agree to form a joint venture for the development and commercialization of AI-powered solutions for the financial services sector.

// 2. CONTRIBUTIONS
// - Ghost: AI algorithms, domain expertise, and client relationships
// - Innovation Labs Ltd: Development resources, infrastructure, and funding

// 3. OWNERSHIP AND PROFIT SHARING
// - Equity split: 50% each
// - Profit distribution: 50% each after operating expenses
// - Intellectual property: Jointly owned

// 4. MANAGEMENT STRUCTURE
// The joint venture shall be managed by a Management Committee consisting of:
// - Two representatives from each party
// - Independent Chairperson (appointed by mutual agreement)

// 5. TERM
// The joint venture shall operate for an initial term of 5 years, renewable by mutual consent.

// 6. EXIT MECHANISMS
// Either party may exit the joint venture upon:
// - 12 months' written notice
// - Mutual agreement on fair value buyout`,
//         participants: 10,
//         updates: 6,
//         pages: 28,
//         wordCount: "10,200",
//         version: "1.0",
//     },
//     {
//         id: "007",
//         userId: user.id,
//         title: "Data Processing Agreement",
//         creator: "9ine5tarx",
//         description: "A data processing agreement between 9ine5tarx and DataSecure Inc. for GDPR-compliant data processing services.",
//         createdAt: "2026-01-01",
//         deadline: "2026-05-07",
//         status: "Pending",
//         counterparty: "DataSecure Inc.",
//         terms: "The data processor shall process all personal data in accordance with GDPR requirements. Data protection impact assessments shall be conducted annually.",
//         fullContract: `This Data Processing Agreement (the "DPA") is entered into on January 1, 2026, between 9ine5tarx (the "Data Controller") and DataSecure Inc. (the "Data Processor").

// 1. DATA PROCESSING PURPOSE
// The Data Processor shall process personal data on behalf of the Data Controller for the purpose of:
// - Customer relationship management
// - Marketing and communications
// - Analytics and reporting
// - Service delivery and support

// 2. DATA PROCESSING OBLIGATIONS
// The Data Processor shall:
// - Process data only in accordance with documented instructions
// - Implement appropriate technical and organizational measures
// - Ensure confidentiality of processing personnel
// - Notify the Data Controller of any data breaches

// 3. GDPR COMPLIANCE
// - Lawful processing basis shall be documented
// - Data Protection Impact Assessments shall be conducted annually
// - Records of processing activities shall be maintained
// - Data Subject Rights requests shall be responded to within 30 days

// 4. SUB-PROCESSORS
// The Data Processor may engage sub-processors subject to:
// - Written approval from the Data Controller
// - Contractual obligations mirroring this DPA
// - Compliance with GDPR requirements

// 5. DATA RETENTION
// Personal data shall be retained for the duration of the agreement and deleted upon termination, unless required by law.`,
//         participants: 4,
//         updates: 3,
//         pages: 20,
//         wordCount: "7,500",
//         version: "2.2",
//     },
// ];