import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Polygon, Tooltip, Circle } from 'react-leaflet'
import { PieChart, Pie, Cell } from 'recharts'

import { getStatus, substractReportValues } from '../SpecialFunctions'

const COLORS = {
  alerts: '#ed2a20',
  warnings: '#FFC511',
  normal: '#50E3C2'
}

class ZonePolygon extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedPositionPosition: null,
      selectedPositionIndex: null
    }
  }

  render () {
    const props = this.props

    const reports = substractReportValues(props.reports)

    const { status } = getStatus(reports || null)

    const alerts = reports.alarms.length
    // const warnings = data.warnings ? data.warnings.length : null
    const positions = props.zone.positions
    if (this.state.selectedPositionIndex !== null) {
      positions[this.state.selectedPositionIndex] = props.mouseLatLng
    }

    console.log(positions[this.state.selectedPositionIndex])

    return (
      <Polygon
        color="#666"
        fillColor="#fff"
        weight={1}
        positions={positions}
        fillOpacity={props.highlightedZone === props.zone._id ? 0.7 : 0.4}
        onMouseOver={() => props.onMouseOver(props.zone._id)}
        onMouseOut={() => props.onMouseOut(null)}
        onClick={props.onClick}
        >
        {
          positions.map((position, index) =>
          <Circle
            key={props.zone._id + index}
            center={position}
            radius={10}
            weight={3}
            stroke
            fill
            fillColor="red"
            onClick={() => this.setState({selectedPositionIndex: index})}
            onMouseOver={() => console.log('Mouse over')}
          />
          )
        }
        <Tooltip permanent opacity={1} >
          <div className={`tooltip ${props.highlightedZone === props.zone._id ? 'active' : ''}`}>
            <div className="content">
              <div className="hidable">
                {
                  status
                  && <PieChart width={85} height={85}>
                    <Pie
                      dataKey="value"
                      data={status}
                      outerRadius={42}
                      innerRadius={34}
                      startAngle={90}
                      endAngle={-270}
                      fill=""
                      animationEase="ease"
                      animationDuration={501}
                      animationBegin={0}
                    >
                    { status.map((status, index) => <Cell key={index} fill={COLORS[status.name]} />) }
                    </Pie>
                  </PieChart>
                }
              </div>
              <div className={`general`}>
                <div className="icons">
                  {/* { warnings > 0 ? <span className="warnings-icon" /> : null } */}
                  { alerts > 0 ? <span className="alerts-icon" /> : null }
                </div>
                <h3>{props.zone.name}</h3>
              </div>
            </div>
            {/* <span className="hidable">{getStatus(status).normalPercentage * 100}%</span> */}
          </div>
        </Tooltip>
      </Polygon>
    )
  }
}
ZonePolygon.propTypes = {
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  highlightedZone: PropTypes.string,
  zone: PropTypes.object.isRequired,
  reports: PropTypes.array,
  onClick: PropTypes.func
}

export default ZonePolygon
