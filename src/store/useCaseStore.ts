
import { create } from 'zustand';

export type CaseStatus = 'Review' | 'Approve' | 'Reject' | 'Created';

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
    occupation?: string;
    employer?: string;
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
  updateCaseStatus: (caseId: string, status: CaseStatus) => void;
}

const MOCK_CASES: Case[] = [
  {
    id: '1',
    applicationId: 'FR-PEP-CASE-01',
    status: 'Created',
    firstName: 'Roman',
    lastName: 'Abramovich',
    evaluationTime: '16 Jul 24, 17:57',
    tags: [
      { id: '3', name: 'Watchlist Hit', color: 'purple' },
    ],
    assignee: 'investigator@fravity.ai',
    details: {
      ssn: '123-45-6789',
      primaryAddress: 'Moscow, Russia',
      primaryEmail: 'roman.abra@casex.com',
      primaryPhone: '555-123-4567',
      dateOfBirth: '24/10/1966',
      geoLocation: {
        lat: 40.7128,
        lng: -74.0060,
      },
      occupation: 'Entrepreneur'
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
    applicationId: 'FR-PEP-CASE-02',
    status: 'Created',
    firstName: 'Roman',
    lastName: 'Abramovich',
    evaluationTime: '04 Dec 24, 02:33',
    tags: [
      { id: '3', name: 'Watchlist Hit', color: 'purple' },
    ],
    assignee: 'investigator@fravity.ai',
    details: {
      ssn: '987-65-4321',
      primaryAddress: 'Minsk, Belarus',
      primaryEmail: 'movich.oman@crafty.ai',
      primaryPhone: '555-987-6543',
      dateOfBirth: '12/10/1984',
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
    ],
  },
  {
    id: '3',
    applicationId: 'FR-PEP-CASE-03',
    status: 'Approve',
    firstName: 'Ali',
    lastName: 'Reza',
    evaluationTime: '15 Oct 24, 23:16',
    tags: [
      { id: '3', name: 'Watchlist Hit', color: 'purple' },
    ],
    assignee: 'investigator@fravity.ai',
    details: {
      ssn: '456-78-9012',
      primaryAddress: 'San Jose, CA, USA',
      primaryEmail: 'ali@meta.com',
      primaryPhone: '555-456-7890',
      dateOfBirth: '12/10/1994',
      geoLocation: {
        lat: 41.8781,
        lng: -87.6298,
      },
      occupation: 'Software Engineer',
      employer: 'Meta Inc',
    },
    notes: [],
  },
  {
    id: '4',
    applicationId: 'FR-PEP-CASE-04',
    status: 'Approve',
    firstName: 'Ali',
    lastName: 'Reza',
    evaluationTime: '14 Oct 24, 03:33',
    tags: [
      { id: '3', name: 'Watchlist Hit', color: 'purple' },
    ],
    assignee: 'investigator@fravity.ai',
    details: {
      ssn: '789-01-2345',
      primaryAddress: 'Tehran, Iran',
      primaryEmail: 'reza@rubflow.com',
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
    applicationId: 'FR-PEP-CASE-05',
    status: 'Approve',
    firstName: 'Adam',
    lastName: 'Clarke',
    evaluationTime: '16 Jul 24, 17:54',
    tags: [
      { id: '3', name: 'Watchlist Hit', color: 'purple' },
    ],
    assignee: 'investigator@fravity.ai',
    details: {
      ssn: '321-65-9870',
      primaryAddress: '202 Elm St, Los Angeles, CA 90001',
      primaryEmail: 'adam.clarke@geopool.com',
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
      set({ cases: get().cases.length ? get().cases : MOCK_CASES, loading: false });
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
  },

  updateCaseStatus: (caseId, status) => {
    set(state => ({
      cases: state.cases.map(c => {
        if (c.id === caseId) {
          return { ...c, status };
        }
        return c;
      }),
      selectedCase: state.selectedCase?.id === caseId
        ? { ...state.selectedCase, status: status }
        : state.selectedCase
    }));
  }
}));