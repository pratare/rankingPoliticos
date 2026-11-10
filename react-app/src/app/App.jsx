import { useEffect, useMemo, useState } from 'react'
import Header from '../components/layout/Header'
import Hero from '../features/ranking/Hero'
import Filters from '../features/ranking/Filters'
import RankingTable from '../features/ranking/RankingTable'
import ParliamentDetail from '../features/ranking/ParliamentDetail'
import ParliamentComparison from '../features/ranking/ParliamentComparison'
import CriteriaGrid from '../features/ranking/CriteriaGrid'
import Methodology from '../features/ranking/Methodology'
import TransparencyModal from '../features/ranking/TransparencyModal'
import Footer from '../components/layout/Footer'
import { rankingRows, criteria, methodology, parliamentProfiles, defaultWeights, weightProfiles } from '../data/mockData'
import { fetchRankingFromApi, filterRanking, normalizeRankingRow } from '../services/parliamentService'

const EMPTY_FILTERS = {
  cargo: 'Todos',
  estado: 'Todos',
  partido: 'Todos',
  query: '',
}

export default function App() {
  const [sourceRows, setSourceRows] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [selectedParliamentId, setSelectedParliamentId] = useState(null)
  const [comparison, setComparison] = useState({
    leftId: null,
    rightId: null,
  })
  const [selectedProfile, setSelectedProfile] = useState('balanced')
  const [criterionWeights, setCriterionWeights] = useState({ ...defaultWeights })
  const [isTransparencyOpen, setIsTransparencyOpen] = useState(false)

  useEffect(() => {
    let active = true

    const loadRows = async () => {
      setIsLoading(true)
      try {
        const nextRows = await fetchRankingFromApi(filters)

        if (active) {
          setSourceRows(nextRows)
        }
      } catch (error) {
        console.error('Erro ao carregar ranking:', error)
        if (active) {
          setSourceRows([])
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadRows()

    return () => {
      active = false
    }
  }, [filters])

  const filterOptions = useMemo(
    () => ({
      cargo: ['Todos', ...new Set(sourceRows.map((row) => row.role))],
      estado: ['Todos', ...new Set(sourceRows.map((row) => row.state))].sort((a, b) => a.localeCompare(b)),
      partido: ['Todos', ...new Set(sourceRows.map((row) => row.party))].sort((a, b) => a.localeCompare(b)),
    }),
    [sourceRows],
  )

  const filteredRows = useMemo(() => filterRanking(sourceRows, filters), [sourceRows, filters])

  useEffect(() => {
    if (!filteredRows.length) {
      setSelectedParliamentId(null)
      return
    }

    const isCurrentSelectedVisible = filteredRows.some((row) => row.id === selectedParliamentId)

    if (!isCurrentSelectedVisible) {
      setSelectedParliamentId(filteredRows[0].id)
    }
  }, [filteredRows, selectedParliamentId])

  useEffect(() => {
    if (!sourceRows.length) {
      return
    }

    const leftId = selectedParliamentId ?? sourceRows[0].id
    const rightId = sourceRows.find((row) => row.id !== leftId)?.id ?? leftId

    setComparison((current) => ({
      leftId: current.leftId ?? leftId,
      rightId: current.rightId ?? rightId,
    }))
  }, [selectedParliamentId, sourceRows])

  const selectedParliament = useMemo(() => {
    if (!filteredRows.length) {
      return null
    }

    const candidate = parliamentProfiles.find((member) => member.id === selectedParliamentId)

    if (candidate) {
      return candidate
    }

    const sourceCandidate = sourceRows.find((member) => member.id === selectedParliamentId)
    const fallbackRow = sourceCandidate ?? filteredRows[0]

    if (!fallbackRow) {
      return parliamentProfiles[0] ?? null
    }

    return {
      ...normalizeRankingRow(fallbackRow),
      averageRanking: '7,3',
      updatedAt: '24/10/2026',
      strengths: ['Presença e assiduidade', 'Produção legislativa'],
      weaknesses: ['Dados em revisão', 'Transparência pendente'],
      methodology: ['Nota final baseada no ranking oficial do período atual.'],
      resourceManagement: {
        declaredAmount: 'R$ 240.000',
        usedAmount: 'R$ 163.200',
        usageRate: '68%',
        availableBudget: 'R$ 360.000',
        source: 'Portal da Transparência',
      },
      sources: ['Portal da Transparência', 'Dados abertos da União'],
      criteria: criteria.map((criterion, index) => ({
        ...criterion,
        score: index % 2 === 0 ? '8,5' : '7,8',
        weight: [25, 20, 15, 15, 15, 10][index],
      })),
    }
  }, [filteredRows, selectedParliamentId, sourceRows])

  const handleFilterChange = (field, value) => {
    setFilters((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const resetFilters = () => setFilters(EMPTY_FILTERS)

  const handleComparisonChange = (field, value) => {
    setComparison((current) => {
      const next = { ...current, [field]: value }

      if (field === 'leftId' && value === next.rightId) {
        const other = sourceRows.find((row) => row.id !== value)?.id ?? value
        next.rightId = other
      }

      if (field === 'rightId' && value === next.leftId) {
        const other = sourceRows.find((row) => row.id !== value)?.id ?? value
        next.leftId = other
      }

      return next
    })
  }

  const normalizeWeights = (currentWeights, changedCriterionId, nextValue) => {
    const nextWeights = {
      ...currentWeights,
      [changedCriterionId]: Number(nextValue),
    }

    const criteriaKeys = Object.keys(nextWeights)
    const adjustedTotal = criteriaKeys.reduce((sum, key) => sum + Number(nextWeights[key] ?? 0), 0)

    if (!adjustedTotal) {
      return { ...defaultWeights }
    }

    const targetTotal = 100
    const otherKeys = criteriaKeys.filter((key) => key !== changedCriterionId)
    const otherTotal = otherKeys.reduce((sum, key) => sum + Number(nextWeights[key] ?? 0), 0)

    if (!otherTotal) {
      const even = targetTotal / otherKeys.length
      otherKeys.forEach((key) => {
        nextWeights[key] = Number(even.toFixed(2))
      })
      return nextWeights
    }

    let remaining = targetTotal - Number(nextWeights[changedCriterionId] ?? 0)
    const finalWeights = { ...nextWeights }

    otherKeys.forEach((key, index) => {
      const fraction = Number(finalWeights[key] ?? 0) / otherTotal
      const value = index === otherKeys.length - 1 ? Number(remaining.toFixed(2)) : Number((fraction * remaining).toFixed(2))
      finalWeights[key] = value
      remaining = Number((remaining - value).toFixed(2))
    })

    return finalWeights
  }

  const handleWeightProfileChange = (profileKey) => {
    if (!weightProfiles[profileKey]) {
      return
    }

    setSelectedProfile(profileKey)
    setCriterionWeights({ ...weightProfiles[profileKey] })
  }

  const handleWeightChange = (criterionId, value) => {
    setSelectedProfile('custom')
    setCriterionWeights((current) => normalizeWeights(current, criterionId, value))
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Filters
          filters={filters}
          options={filterOptions}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />
        <RankingTable rows={filteredRows} isLoading={isLoading} onSelectParliament={setSelectedParliamentId} />
        <ParliamentDetail
          parliament={selectedParliament}
          onOpenTransparency={() => setIsTransparencyOpen(true)}
        />
        <ParliamentComparison
          rows={sourceRows.map((row) => ({
            ...row,
            profile: parliamentProfiles.find((profile) => profile.id === row.id) ?? row,
          }))}
          leftId={comparison.leftId}
          rightId={comparison.rightId}
          weights={criterionWeights}
          profilePreset={selectedProfile}
          onApplyPreset={handleWeightProfileChange}
          onLeftChange={(value) => handleComparisonChange('leftId', value)}
          onRightChange={(value) => handleComparisonChange('rightId', value)}
          onWeightChange={handleWeightChange}
        />
        <CriteriaGrid criteria={criteria} />
        <Methodology
          items={methodology}
          weights={criterionWeights}
          selectedProfile={selectedProfile}
        />
      </main>
      <TransparencyModal
        isOpen={isTransparencyOpen}
        parliament={selectedParliament}
        onClose={() => setIsTransparencyOpen(false)}
      />
      <Footer />
    </>
  )
}
