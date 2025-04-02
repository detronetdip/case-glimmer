
import { create } from 'zustand';

export type CaseStatus = 'Review' | 'Approve' | 'Reject';

export type Tag = {
  id: string;
  name: string;
  color: 'red' | 'green' | 'blue' | 'yellow' | 'purple';
};

export type Note = {
  id: string;
  text: string;
  addedBy: string;
  date: string;
  time: string;
};

export type Case = {
  id: string;
  applicationId: string;
  status: CaseStatus;
  firstName: string;
  lastName: string;
  evaluationTime: string;
  tags: Tag[];
  assignee: string | null;
  assigneeEmail?: string;
  details?: {
    ssn?: string;
    primaryAddress?: string;
    primaryEmail?: string;
    primaryPhone?: string;
    dateOfBirth?: string;
    geoLocation?: {
      lat: number;
      lng: number;
    };
  };
  notes?: Note[];
};

interface CaseStore {
  cases: Case[];
  selectedCase: Case | null;
  loading: boolean;
  error: string | null;
  fetchCases: () => void;
  selectCase: (caseId: string) => void;
  clearSelectedCase: () => void;
  addNote: (caseId: string, note: Omit<Note, 'id' | 'date' | 'time'>) => void;
}

const MOCK_CASES: Case[] = [
  {
    id: '1',
    applicationId: '20240716_03',
    status: 'Review',
    firstName: 'George',
    lastName: 'Michael',
    evaluationTime: '16 Jul 24, 17:57',
    tags: [
      { id: '1', name: 'Phone Not Valid', color: 'yellow' },
      { id: '2', name: 'New Email Domain', color: 'blue' },
    ],
    assignee: 'archeragent@effectiv.ai',
    details: {
      ssn: '123-45-6789',
      primaryAddress: '123 Main St, New York, NY 10001',
      primaryEmail: 'george.michael@example.com',
      primaryPhone: '555-123-4567',
      dateOfBirth: '01/15/1985',
      geoLocation: {
        lat: 40.7128,
        lng: -74.0060,
      },
    },
    notes: [
      {
        id: '1',
        text: "{'request_id': 1742514992015, 'workflow_id': 'w_a430cde0', 'workflow_name': 'Business Due Diligence'}",
        addedBy: 'system',
        date: '21 Mar 25',
        time: '05:29',
      }
    ],
  },
  {
    id: '2',
    applicationId: '1234',
    status: 'Review',
    firstName: 'Alexandre',
    lastName: 'Kvinikadze',
    evaluationTime: '04 Dec 24, 02:33',
    tags: [
      { id: '3', name: 'Address Mismatch', color: 'yellow' },
    ],
    assignee: 'archeragent@effectiv.ai',
    details: {
      ssn: '987-65-4321',
      primaryAddress: '456 Oak St, San Francisco, CA 94101',
      primaryEmail: 'skvinikadze@frivity.ai',
      primaryPhone: '555-987-6543',
      dateOfBirth: '05/22/1990',
      geoLocation: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    notes: [
      {
        id: '2',
        text: "{'request_id': 1742514992015, 'workflow_id': 'w_a430cde0', 'workflow_name': 'Business Due Diligence'}",
        addedBy: 'system',
        date: '21 Mar 25',
        time: '05:29',
      },
      {
        id: '3',
        text: "asd;fjasdkflasd;fjasdkjf;asdkjf",
        addedBy: 'admin user',
        date: '20 Mar 25',
        time: '06:36',
      },
      {
        id: '4',
        text: "j;sdkfjg;asdkfja;sdkfj",
        addedBy: 'admin user',
        date: '20 Mar 25',
        time: '06:15',
      },
    ],
  },
  {
    id: '3',
    applicationId: 'FR-PEP-Case-1',
    status: 'Approve',
    firstName: 'Najib',
    lastName: 'Razak',
    evaluationTime: '15 Oct 24, 23:16',
    tags: [],
    assignee: null,
    details: {
      ssn: '456-78-9012',
      primaryAddress: '789 Pine St, Chicago, IL 60601',
      primaryEmail: 'najib.razak@example.com',
      primaryPhone: '555-456-7890',
      dateOfBirth: '08/10/1978',
      geoLocation: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },
    notes: [],
  },
  {
    id: '4',
    applicationId: 'DD-FR-1',
    status: 'Approve',
    firstName: '',
    lastName: '',
    evaluationTime: '14 Oct 24, 03:33',
    tags: [],
    assignee: null,
    details: {
      ssn: '789-01-2345',
      primaryAddress: '101 Maple Ave, Boston, MA 02108',
      primaryEmail: 'contact@example.com',
      primaryPhone: '555-789-0123',
      dateOfBirth: '03/25/1982',
      geoLocation: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    notes: [],
  },
  {
    id: '5',
    applicationId: '20240716_02',
    status: 'Approve',
    firstName: 'Adam',
    lastName: 'Clarke',
    evaluationTime: '16 Jul 24, 17:54',
    tags: [
      { id: '4', name: 'Device Incognito', color: 'yellow' },
      { id: '5', name: 'Experian Success', color: 'green' },
    ],
    assignee: 'archeragent@effectiv.ai',
    details: {
      ssn: '321-65-9870',
      primaryAddress: '202 Elm St, Los Angeles, CA 90001',
      primaryEmail: 'adam.clarke@example.com',
      primaryPhone: '555-321-6547',
      dateOfBirth: '11/30/1979',
      geoLocation: {
        lat: 34.0522,
        lng: -118.2437,
      },
    },
    notes: [],
  },
];

export const useCaseStore = create<CaseStore>((set, get) => ({
  cases: [],
  selectedCase: null,
  loading: false,
  error: null,

  fetchCases: () => {
    set({ loading: true });
    // Simulate API fetch with mock data
    setTimeout(() => {
      set({ cases: MOCK_CASES, loading: false });
    }, 500);
  },

  selectCase: (caseId) => {
    const selectedCase = get().cases.find(c => c.id === caseId) || null;
    set({ selectedCase });
  },

  clearSelectedCase: () => {
    set({ selectedCase: null });
  },

  addNote: (caseId, note) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: '2-digit'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });

    const newNote = {
      ...note,
      id: Date.now().toString(),
      date: formattedDate,
      time: formattedTime,
    };

    set(state => ({
      cases: state.cases.map(c => {
        if (c.id === caseId) {
          return {
            ...c,
            notes: [...(c.notes || []), newNote]
          };
        }
        return c;
      }),
      selectedCase: state.selectedCase?.id === caseId 
        ? { ...state.selectedCase, notes: [...(state.selectedCase.notes || []), newNote] }
        : state.selectedCase
    }));
  }
}));
